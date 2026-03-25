import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  // storage: {
  //   kind: 'local',
  // },

  storage: {
    kind: 'github',
    repo: {
      owner: 'encicat',
      name: 'website',
    },
  },

  singletons: {
    settings: singleton({
      path: 'content/settings',
      label: 'Configuración',
      schema: {
        title: fields.text({ label: 'Título' }),
        slogan: fields.text({ label: 'Slogan' }),
        logo: fields.image({
          label: 'Logotipo',
          directory: 'public/images/',
          publicPath: '/images/',
        }),
        email: fields.text({ label: 'Email' }),
        cookies_message: fields.markdoc({ label: 'Mensaje de cookies' }),
      },
    }),
    social: singleton({
      path: 'content/social',
      label: 'Redes sociales',
      schema: {
        socials_networks: fields.array(
          fields.object({
            name: fields.text({ label: 'Nombre' }),
            url: fields.text({ label: 'URL' }),
          }),
          {
            label: 'Redes sociales',
            itemLabel: (props) => props.fields.name.value,
          },
        ),
      },
    }),
    donation_methods: singleton({
      path: 'content/donations',
      label: 'Métodos de donaciones',
      schema: {
        platforms: fields.array(
          fields.object({
            name: fields.text({ label: 'Nombre' }),
            url: fields.text({ label: 'URL' }),
            code: fields.text({ label: 'Código' }),
            description: fields.text({ label: 'Descripción', multiline: true }),
          }),
          {
            label: 'Métodos de donaciones',
            itemLabel: (props) => props.fields.name.value,
          },
        ),
      },
    }),
    home_page: singleton({
      path: 'content/pages/home',
      label: 'Página de inicio',
      schema: {
        adoption_show: fields.select({
          label: 'Mostrar adopciones?',
          defaultValue: 'yes',
          options: [
            { value: 'yes', label: 'Sí' },
            { value: 'no', label: 'No' },
          ],
        }),
        adoption_title: fields.text({ label: 'Título de adopciones' }),
        adoption_subtitle: fields.text({ label: 'Subtítulo de adopciones' }),
        donation_methods_show: fields.select({
          label: 'Mostrar donaciones?',
          defaultValue: 'yes',
          options: [
            { value: 'yes', label: 'Sí' },
            { value: 'no', label: 'No' },
          ],
        }),
        donation_methods_title: fields.text({ label: 'Título de donaciones' }),
        donation_methods_subtitle: fields.text({
          label: 'Subtítulo de donaciones',
        }),
      },
    }),
    help_page: singleton({
      path: 'content/pages/help',
      label: 'Página Ayudanos',
      schema: {
        content: fields.markdoc({ label: 'Contenido' }),
      },
    }),
    terms_page: singleton({
      path: 'content/pages/terms',
      label: 'Términos y condiciones',
      schema: {
        title: fields.text({ label: 'Título la página' }),
        content: fields.markdoc({ label: 'Contenido' }),
      },
    }),
    privacy_page: singleton({
      path: 'content/pages/privacy',
      label: 'Política de privacidad',
      schema: {
        title: fields.text({ label: 'Título la página' }),
        content: fields.markdoc({ label: 'Contenido' }),
      },
    }),
  },
  collections: {
    posts: collection({
      label: 'Entradas',
      slugField: 'title',
      path: 'content/posts/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Título' } }),
        image: fields.image({
          label: 'Imágen destacada',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        publishedAt: fields.datetime({ label: 'Fecha de publicación' }),
        content: fields.markdoc({ label: 'Contenido' }),
      },
    }),
    adoptions: collection({
      label: 'Adopciones',
      slugField: 'name',
      path: 'content/adoptions/*/',
      format: { contentField: 'content' },
      schema: {
        name: fields.slug({ name: { label: 'Nombre' } }),
        birthdate: fields.date({ label: 'Fecha de nacimiento' }),
        gender: fields.select({
          label: 'Género',
          defaultValue: 'female',
          options: [
            { label: 'Macho', value: 'male' },
            { label: 'Hembra', value: 'female' },
          ],
        }),
        breed: fields.select({
          label: 'Raza',
          defaultValue: 'mix',
          options: [{ value: 'mix', label: 'Mixto' }],
        }),
        pets_friendly: fields.select({
          label: 'Amistoso con otros animales',
          defaultValue: 'no',
          options: [
            { value: 'yes', label: 'Sí' },
            { value: 'no', label: 'No' },
          ],
        }),
        vaccinated: fields.select({
          label: 'Vacunado?',
          defaultValue: 'no',
          options: [
            { value: 'yes', label: 'Sí' },
            { value: 'no', label: 'No' },
          ],
        }),
        children_friendly: fields.select({
          label: 'Amistoso con ninos?',
          defaultValue: 'no',
          options: [
            { value: 'yes', label: 'Sí' },
            { value: 'no', label: 'No' },
          ],
        }),
        image: fields.image({
          label: 'Imágen destacada',
          directory: 'public/images/adoptions',
          publicPath: '/images/adoptions/',
        }),
        adoptedAt: fields.date({
          label: 'Fecha de adopción',
          description: 'Cuando esté adoptado',
        }),
        publishedAt: fields.date({ label: 'Fecha de publicación' }),
        content: fields.markdoc({ label: 'Contenido' }),
        images: fields.array(
          fields.image({
            label: 'Imágen',
            directory: 'public/images/adoptions',
            publicPath: '/images/adoptions/',
          }),
          {
            label: 'Imágenes',
            itemLabel: (props) => props.value?.filename ?? 'item',
          },
        ),
      },
    }),
  },
});
