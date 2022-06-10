<template>
  <div class="sidebar">
    <vuescroll :ops="scrollOptions">
      <div class="sidebar__brand flex-column">
        <img
          class="img-fluid"
          :src="settings.logo_white"
          style="height: 32px;"
          alt=""
        />
      </div>
      <ul class="sidebar__menu">
        <li
          v-for="(menu, menu_idx) in menus"
          :key="menu.slug"
          class="sidebar__menu__item"
        >
          <router-link
            @click="selectMenu(menu_idx)"
            v-if="!menu.has_child"
            :to="'/' + menu.slug"
            :class="
              `sidebar__menu__link ${currentMenu === menu.slug &&
                'sidebar__menu__link--active'}`
            "
          >
            <i :class="menu.icon"></i>
            <span class="sidebar__menu__link__text">{{ menu.name }}</span>
          </router-link>

          <a
            @click="selectMenu(menu_idx)"
            v-else
            :class="
              `sidebar__menu__link cursor-pointer ${currentMenu === menu.slug &&
                'sidebar__menu__link--active'}`
            "
          >
            <i :class="menu.icon"></i>
            <span class="sidebar__menu__link__text">{{ menu.name }}</span>
            <i
              v-if="menu.is_active"
              class="fa fa-chevron-down ml-auto icon-md"
            ></i>
            <i v-else class="fa fa-chevron-right ml-auto icon-md"></i>
          </a>

          <ul class="sidebar__menu" v-show="menu.is_active">
            <li
              class="sidebar__menu__item"
              v-for="(submenu, submenu_idx) in menu.children"
              :key="submenu.id"
            >
              <router-link
                :to="
                  menu.slug !== 'pages'
                    ? `/${menu.slug}/${submenu.slug}`
                    : `/${menu.slug}?page=${submenu.slug}`
                "
                v-if="!submenu.has_child"
                @click="selectSubmenu(menu_idx, submenu_idx)"
                :class="
                  `sidebar__menu__link sidebar__menu__link--submenu pl-10 cursor-pointer ${currentSubmenu ===
                    submenu.slug && 'sidebar__menu__link--active'}`
                "
              >
                <i class="fa fa-genderless icon-md"></i>
                <span class="sidebar__menu__link__text">
                  {{ submenu.name }}
                </span>
                <i
                  class="fa fa-chevron-down ml-auto icon-md"
                  v-if="submenu.has_child"
                ></i>
              </router-link>
              <a
                v-else
                @click="selectSubmenu(menu_idx, submenu_idx)"
                :class="
                  `sidebar__menu__link sidebar__menu__link--submenu pl-10 cursor-pointer ${currentSubmenu ===
                    submenu.slug && 'sidebar__menu__link--active'}`
                "
              >
                <i class="fa fa-genderless icon-md"></i>
                <span class="sidebar__menu__link__text">
                  {{ submenu.name }}
                </span>
                <i
                  class="fa fa-chevron-down ml-auto icon-md"
                  v-if="submenu.has_child"
                ></i>
              </a>
              <ul
                class="sidebar__menu"
                v-if="submenu.has_child && submenu.is_active"
              >
                <li class="sidebar__menu__item">
                  <router-link
                    :to="`/${menu.slug}?page=${submenu2.slug}`"
                    :class="
                      `sidebar__menu__link sidebar__menu__link--submenu pl-16 border-0 cursor-pointer ${currentSubmenu2 ===
                        submenu2.slug && 'sidebar__menu__link--active'}`
                    "
                    v-for="submenu2 in submenu.children"
                    :key="submenu2.id"
                  >
                    <i class="fa fa-genderless icon-md"></i>
                    <span class="sidebar__menu__link__text">
                      {{ submenu2.name }}
                    </span>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </vuescroll>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import vuescroll from 'vuescroll';

@Component({
  components: { vuescroll }
})
export default class Sidebar extends Vue {
  menus = [
    {
      name: 'Artikel',
      slug: 'posts',
      icon: 'la la-newspaper',
      is_active: false,
      has_child: false,
      children: []
    },
    {
      name: 'Menu',
      slug: 'menu',
      icon: 'las la-clipboard-list',
      is_active: false,
      has_child: false,
      children: []
    },
    {
      name: 'Halaman',
      slug: 'pages',
      icon: 'las la-folder',
      is_active: false,
      has_child: false,
      children: []
    },
    // {
    //   name: 'Plugins',
    //   slug: 'plugins',
    //   icon: 'la la-plug',
    //   is_active: false,
    //   has_child: true,
    //   children: [
    //     {
    //       name: 'Datatable',
    //       slug: 'datatable',
    //       has_child: false,
    //       is_active: false,
    //       children: []
    //     }
    //   ]
    // },
    // {
    //   name: 'Informasi',
    //   slug: 'informasi',
    //   icon: 'las la-info-circle',
    //   is_active: false,
    //   has_child: false,
    //   children: []
    // },
    // {
    //   name: 'Regulasi',
    //   slug: 'regulasi',
    //   icon: 'las la-exclamation-triangle',
    //   is_active: false,
    //   has_child: false,
    //   children: []
    // },
    // {
    //   name: 'Members',
    //   slug: 'members',
    //   icon: 'las la-user',
    //   is_active: false,
    //   has_child: false,
    //   children: []
    // },
    // {
    //   name: 'Members',
    //   slug: 'members',
    //   icon: 'las la-users',
    //   is_active: false,
    //   has_child: false,
    //   children: []
    // },
    // {
    //   name: 'Iuran Sukarela',
    //   slug: 'iuran',
    //   icon: 'las la-money-bill-wave',
    //   is_active: false,
    //   has_child: false,
    //   children: []
    // },
    {
      name: 'Pengaturan',
      slug: 'settings',
      icon: 'la la-cog',
      is_active: false,
      has_child: true,
      children: [
        {
          name: 'General',
          slug: 'general',
          has_child: false,
          is_active: false,
          children: []
        },
        {
          name: 'Social Media',
          slug: 'social-media',
          has_child: false,
          is_active: false,
          children: []
        },
        {
          name: 'Template',
          slug: 'template',
          has_child: false,
          is_active: false,
          children: []
        }
      ]
    }
  ];

  scrollOptions = {
    rail: {
      background: '#01a99a',
      opacity: 0,
      size: '5px',
      gutterOfEnds: null,
      gutterOfSide: '0px',
      keepShow: false
    },
    bar: {
      background: '#c1c1c1',
      opacity: 1,
      specifyBorderRadius: true,
      size: '8px'
    }
  };

  get currentMenu() {
    const path = this.$route.path.split('/');
    return path[1];
  }

  get settings() {
    return this.$store.getters['user/SETTINGS'];
  }

  get currentSubmenu() {
    if (this.currentMenu == 'pages') {
      const pageQuery = this.$route.query.page;
      let selectedPage = '';
      this.menus[1].children.forEach((submenu: any) => {
        if (!submenu.has_child) {
          if (submenu.slug === pageQuery) {
            selectedPage = submenu.slug;
          }
        } else if (submenu.has_child) {
          submenu.children.forEach((submenu2: any) => {
            if (submenu2.slug === pageQuery) {
              selectedPage = submenu.slug;
            }
          });
        }
      });
      return selectedPage;
    } else {
      const path = this.$route.path.split('/');
      return path[2];
    }
  }

  get currentSubmenu2() {
    if (this.currentMenu == 'pages') {
      return this.$route.query.page;
    } else {
      const path = this.$route.path.split('/');
      return path[3];
    }
  }

  selectMenu(index: number) {
    const selectedMenu = this.menus[index];
    if (!selectedMenu.has_child) {
      this.menus.forEach((menu: any) => {
        menu.is_active = false;
      });
      selectedMenu.is_active = true;
    } else {
      selectedMenu.is_active = !selectedMenu.is_active;
    }
  }

  selectSubmenu(parent_index: number, index: number) {
    const selectedSubmenu: any = this.menus[parent_index].children[index];
    if (!selectedSubmenu.has_child) {
      this.menus[parent_index].children.forEach((menu: any) => {
        menu.is_active = false;
      });
      selectedSubmenu.is_active = true;
    } else {
      selectedSubmenu.is_active = !selectedSubmenu.is_active;
    }
  }
}
</script>
