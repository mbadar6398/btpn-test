import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators';
import { getField, updateField } from 'vuex-map-fields';
import { ResponseType } from '@/interfaces/common';
import api from '@/api/index';

function makeid(length: number): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

@Module({ namespaced: true })
export default class Member extends VuexModule {
  members: Array<object> = [];
  memberForm = {
    id: null,
    cabang_utama: '',
    cabang: '',
    wilayah: '',
    nip: '',
    password: '',
    email: '',
    active: 'Yes',
    status: 'pending',
    status_pasif: 'No',
    status_pengurus: 'U',
    status_update: 'No',
    name: '',
    no_ktp: '',
    alamat_ktp: '',
    alamat_domisili: '',
    kota_ktp: '',
    kota_domisili: '',
    kode_pos_ktp: '',
    kode_pos_domisili: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: 'Pria',
    status_kawin: 'Menikah',
    npwp: '',
    telpon_rumah: '',
    no_hp: '',
    tanggal_masuk_bca: '',
    tanggal_kepesertaan: '',
    saldo_periode: '',
    saldo_iuran_peserta: '',
    saldo_iuran_pemberi_kerja: '',
    saldo_hasil_pengembangan: '',
    saldo_spi: '',
    saldo_iuran_sukarela: '',
    saldo_sukarela_hasil_pengembangan: '',
    saldo_sukarela_spi: ''
  };

  member_params = {
    page: 1,
    limit: 20,
    keyword: '',
    status: '',
    wilayah: ''
  };

  @Mutation
  UPDATE_FIELDS(options: { path: string; value: unknown }): unknown {
    return updateField(this, options);
  }

  @Mutation
  RESET_STATE_PARAMS(): void {
    this.member_params = {
      page: 1,
      limit: 20,
      keyword: '',
      status: '',
      wilayah: ''
    };
  }

  @Mutation
  RESET_STATE_FORM(): void {
    this.memberForm = {
      id: null,
      cabang_utama: '',
      cabang: '',
      wilayah: '',
      nip: '',
      password: makeid(8),
      email: '',
      active: 'Yes',
      status: 'pending',
      status_pasif: 'No',
      status_pengurus: 'U',
      status_update: 'No',
      name: '',
      no_ktp: '',
      alamat_ktp: '',
      alamat_domisili: '',
      kota_ktp: '',
      kota_domisili: '',
      kode_pos_ktp: '',
      kode_pos_domisili: '',
      tempat_lahir: '',
      tanggal_lahir: '',
      jenis_kelamin: 'Pria',
      status_kawin: 'Menikah',
      npwp: '',
      telpon_rumah: '',
      no_hp: '',
      tanggal_masuk_bca: '',
      tanggal_kepesertaan: '',
      saldo_periode: '',
      saldo_iuran_peserta: '',
      saldo_iuran_pemberi_kerja: '',
      saldo_hasil_pengembangan: '',
      saldo_spi: '',
      saldo_iuran_sukarela: '',
      saldo_sukarela_hasil_pengembangan: '',
      saldo_sukarela_spi: ''
    };
  }

  @Mutation
  SET_MEMBER_FORM(payload: any): void {
    this.memberForm = {
      id: payload.id,
      cabang_utama: payload.cabang_utama,
      cabang: payload.cabang,
      wilayah: payload.wilayah,
      nip: payload.nip,
      password: payload.password,
      email: payload.email,
      active: payload.active,
      status: payload.status,
      status_pasif: payload.status_pasif,
      status_pengurus: payload.status_pengurus,
      status_update: payload.status_update,
      name: payload.name,
      no_ktp: payload.no_ktp,
      alamat_ktp: payload.alamat_ktp,
      alamat_domisili: payload.alamat_domisili,
      kota_ktp: payload.kota_ktp,
      kota_domisili: payload.kota_domisili,
      kode_pos_ktp: payload.kode_pos_ktp,
      kode_pos_domisili: payload.kode_pos_domisili,
      tempat_lahir: payload.tempat_lahir,
      tanggal_lahir: payload.tanggal_lahir,
      jenis_kelamin: payload.jenis_kelamin,
      status_kawin: payload.status_kawin,
      npwp: payload.npwp,
      telpon_rumah: payload.telpon_rumah,
      no_hp: payload.no_hp,
      tanggal_masuk_bca: payload.tanggal_masuk_bca,
      tanggal_kepesertaan: payload.tanggal_kepesertaan,
      saldo_periode: payload.saldo_periode,
      saldo_iuran_peserta: payload.saldo_iuran_peserta,
      saldo_iuran_pemberi_kerja: payload.saldo_iuran_pemberi_kerja,
      saldo_hasil_pengembangan: payload.saldo_hasil_pengembangan,
      saldo_spi: payload.saldo_spi,
      saldo_iuran_sukarela: payload.saldo_iuran_sukarela,
      saldo_sukarela_hasil_pengembangan:
        payload.saldo_sukarela_hasil_pengembangan,
      saldo_sukarela_spi: payload.saldo_sukarela_spi
    };
  }

  @Action({ rawError: true })
  async GET_MEMBER(): Promise<ResponseType> {
    const params: any = this.member_params;
    const queryString = new URLSearchParams(params).toString();
    const { data } = await api.member.get_member(queryString);
    return data;
  }

  @Action({ rawError: true })
  async GET_DETAIL_MEMBER(id: string): Promise<ResponseType> {
    const { data } = await api.member.get_detail_member(id);
    this.context.commit('SET_MEMBER_FORM', data.data);
    return data;
  }

  @Action({ rawError: true })
  async CREATE_MEMBER(): Promise<ResponseType> {
    const payload = this.memberForm;
    const { data } = await api.member.add_member(payload);
    return data;
  }

  @Action({ rawError: true })
  async UPDATE_MEMBER(): Promise<ResponseType> {
    const payload = this.memberForm;
    const { data } = await api.member.update_member(payload);
    return data;
  }

  @Action({ rawError: true })
  async DOWNLOAD_MEMBER_PERIODE(params: any): Promise<ResponseType> {
    const queryString = new URLSearchParams(params).toString();
    const { data } = await api.member.download_periode(queryString);
    return data;
  }

  @Action({ rawError: true })
  async UPDATE_SALDO(file: Blob): Promise<ResponseType> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.member.update_saldo(formData);
    return data;
  }

  @Action({ rawError: true })
  async UPDATE_SALDO_DETAIL(file: Blob): Promise<ResponseType> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.member.update_saldo_detail(formData);
    return data;
  }

  get GET_FIELDS(): any {
    return getField(this);
  }
}
