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
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().integer().positive(),
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
      hidden: ({ parent, currentUser, value }) =>
        parent.variants?.some((v) => v.sizes?.some((s) => s.stock)),
      initialValue: false,
    }),

    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
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
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      variants: 'variants',
      media: 'pictures.0.asset',
    },
    prepare({ title, variants, media }) {
      const colors = variants.map((v) => v.color)

      return { title, media, subtitle: colors.join(', ') }
    },
  },
})
