import { ColorWheelIcon, ExpandIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'itemType',
      title: 'Item Type',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      options: {
        dateFormat: 'DD-MMMM-YYYY',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'disclaimer',
      title: 'Disclaimer',
      type: 'text',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().integer().positive(),
    }),

    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      description: 'Photos that will appear in Showcase Page',
      type: 'image',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'pictures',
      title: 'Pictures',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'soldout',
      title: 'Sold Out',
      type: 'boolean',
      // readOnly: ({ parent, currentUser, value }) =>
      //   !parent.variants?.some((v) => v.sizes?.some((s) => s.stock)),
      initialValue: false,
    }),

    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [
        {
          type: 'object',
          icon: ColorWheelIcon,
          fields: [
            {
              name: 'color',
              title: 'Color',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'sizes',
              title: 'Sizes',
              type: 'array',
              of: [
                {
                  type: 'object',
                  icon: ExpandIcon,
                  fields: [
                    {
                      name: 'size',
                      title: 'Size',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Medium', value: 'M' },
                          { title: 'Large', value: 'L' },
                          { title: 'Extra Large', value: 'XL' },
                        ],
                        layout: 'radio',
                      },
                      validation: (rule) => rule.required(),
                    },
                    {
                      name: 'stock',
                      title: 'stock',
                      type: 'boolean',
                      initialValue: true,
                    },
                  ],
                },
              ],
            },
          ],
        } as any,
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      variants: 'variants',
      media: 'featuredImage.asset',
    },
    prepare({ title, variants, media }) {
      const colors = variants?.map((v) => v.color)

      return { title, media, subtitle: colors?.join(', ') }
    },
  },
})
