import { collection, config, fields, singleton } from '@keystatic/core';
import Image from 'next/image';

import { imageCropped } from './src/customFields';

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
        phone: fields.text({ label: 'Teléfono' }),
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
      label: 'Página Cómo ayudarles',
      schema: {
        content: fields.markdoc({ label: 'Contenido' }),
      },
    }),
    about_page: singleton({
      path: 'content/pages/about',
      label: 'Quiénes somos',
      schema: {
        title: fields.text({ label: 'Título de la página' }),
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
    adoptions: collection({
      label: 'Adopciones',
      slugField: 'name',
      path: 'content/adoptions/*/',
      format: { contentField: 'content' },
      columns: ['name', 'publishedAt'],
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
        friendly: fields.select({
          label: 'Amistoso',
          defaultValue: 'yes',
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
        dewormed: fields.select({
          label: 'Desparasitado?',
          defaultValue: 'no',
          options: [
            { value: 'yes', label: 'Sí' },
            { value: 'no', label: 'No' },
          ],
        }),
        micro: fields.select({
          label: 'Microchip?',
          defaultValue: 'no',
          options: [
            { value: 'yes', label: 'Sí' },
            { value: 'no', label: 'No' },
          ],
        }),
        tested: fields.select({
          label: 'Test FELV/FIV negativo?',
          defaultValue: 'not_yet',
          options: [
            { value: 'yes', label: 'Sí' },
            { value: 'no', label: 'No' },
            { value: 'not_yet', label: 'No pasado aún' },
          ],
        }),
        image: imageCropped({
          label: 'Imágen destacada',
          directory: 'public/images/adoptions',
          publicPath: '/images/adoptions/',
        }),
        // image: fields.image({
        //   label: 'Imágen destacada',
        //   directory: 'public/images/adoptions',
        //   publicPath: '/images/adoptions/',
        // }),
        // image: fields.custom({
        //   label: 'Imágen destacada',
        //   directory: 'public/images/adoptions',
        //   kind: 'form',
        //   component: ImageCropper,
        //   serialize: (value) => JSON.stringify(value),
        //   deserialize: (value) => (value ? JSON.parse(value) : null),
        // }),
        adoptedAt: fields.date({
          label: 'Fecha de adopción',
          description: 'Cuando esté adoptado',
        }),
        adoption_text: fields.text({
          label: 'Historia de la adopción',
          multiline: true,
          description: 'Solo se muestra en la ficha de los gatos adoptados',
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
    help: collection({
      label: 'Formas de ayudar',
      slugField: 'title',
      path: 'content/help/*/',
      format: { contentField: 'content' },
      columns: ['title', 'order'],
      schema: {
        title: fields.slug({ name: { label: 'Título' } }),
        summary: fields.text({
          label: 'Resumen',
          multiline: true,
          description: 'Texto corto que aparece en el índice de ayuda',
        }),
        icon: fields.select({
          label: 'Icono',
          defaultValue: 'heart',
          options: [
            { value: 'coins', label: 'Donaciones' },
            { value: 'home', label: 'Casa de acogida' },
            { value: 'heart', label: 'Apadrinamiento' },
            { value: 'users', label: 'Voluntariado' },
            { value: 'megaphone', label: 'Difusión' },
            { value: 'heart-handshake', label: 'Adopción' },
          ],
        }),
        order: fields.integer({ label: 'Orden', defaultValue: 0 }),
        donation_methods: fields.checkbox({
          label: 'Mostrar métodos de donación',
          defaultValue: false,
        }),
        adoptions_list: fields.checkbox({
          label: 'Mostrar listado de adopciones',
          defaultValue: false,
        }),
        cards: fields.array(
          fields.object({
            title: fields.text({ label: 'Título' }),
            description: fields.text({ label: 'Descripción', multiline: true }),
            icon: fields.select({
              label: 'Icono',
              defaultValue: 'heart',
              options: [
                { value: 'share', label: 'Compartir' },
                { value: 'message', label: 'Mensaje' },
                { value: 'tag', label: 'Etiqueta' },
                { value: 'store', label: 'Tienda' },
                { value: 'megaphone', label: 'Megáfono' },
                { value: 'heart', label: 'Corazón' },
                { value: 'users', label: 'Personas' },
              ],
            }),
          }),
          {
            label: 'Tarjetas',
            itemLabel: (props) => props.fields.title.value,
          },
        ),
        payment_options: fields.array(
          fields.object({
            name: fields.text({ label: 'Nombre' }),
            code: fields.text({ label: 'Código o IBAN' }),
            description: fields.text({ label: 'Descripción', multiline: true }),
          }),
          {
            label: 'Opciones de pago',
            itemLabel: (props) => props.fields.name.value,
          },
        ),
        cta: fields.object(
          {
            label: fields.text({ label: 'Texto del botón' }),
            url: fields.text({ label: 'Enlace' }),
          },
          { label: 'Llamada a la acción' },
        ),
        content: fields.markdoc({ label: 'Contenido' }),
      },
    }),
  },

  ui: {
    navigation: [
      '---',
      'adoptions',
      'help',
      '---',
      'home_page',
      'help_page',
      'about_page',
      'terms_page',
      'privacy_page',
      '---',
      'settings',
      'social',
      'donation_methods',
    ],
    brand: {
      name: 'EnciCat',
      mark: ({ colorScheme }) => (
        <Image
          src={
            colorScheme === 'dark'
              ? '/images/logo-dark-small-64x64.png'
              : '/images/logo-light-small-64x64.png'
          }
          height={24}
          width={24}
          alt={'Logo'}
        />
      ),
    },
  },
});
