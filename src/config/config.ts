export default {
  base_url: process.env.VUE_APP_BASE_URL,
  postConfig: {
    tags: false
  },
  translation: false,
  tinyMceConfig: {
    selector: 'textarea#open-source-plugins',
    plugins:
      'preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    imagetools_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar:
      'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: false,
    image_advtab: true,
    importcss_append: true,
    height: 720,
    image_caption: true,
    quickbars_selection_toolbar:
      'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image imagetools table',
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  },
  section_configuration: {
    title: false,
    subtitle: false,
    description: false,
    content: false,
    action_url: false,
    action_label: false,
    youtube_url: false,
    image: false,
    image_mobile: false,
    background: false,
    background_mobile: false
  },
  section_card_configuration: {
    title: false,
    subtitle: false,
    description: false,
    content: false,
    action_url: false,
    action_label: false,
    file: false,
    background: false,
    icon: false,
    image: false
  }
};
