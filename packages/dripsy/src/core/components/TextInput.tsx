import React, { ComponentProps, forwardRef } from 'react'
import { TextInput as rTextInput } from 'react-native'
import { DripsyFinalTheme } from '../types-v2/declarations'
import { createThemedComponent } from '../css/create-themed-component'
import { defaultFontStyle } from './defaultStyle'
import { useDripsyTheme } from '../use-dripsy-theme'
import { StyledProps } from '../types-v2/sx'

const DripsyInput = createThemedComponent(rTextInput, {
  themeKey: 'forms',
  defaultVariant: 'input',
  defaultStyle: defaultFontStyle,
})

type InputProps = React.ComponentPropsWithoutRef<typeof DripsyInput>
type ColorKeys = keyof Pick<
  InputProps,
  'selectionColor' | 'underlineColorAndroid' | 'placeholderTextColor'
>

export type DripsyTextInputProps = StyledProps<'forms'> &
  Omit<ComponentProps<typeof rTextInput>, ColorKeys> &
  {
    [key in ColorKeys]?: (string & {}) | keyof DripsyFinalTheme['colors']
  }

const colorKeys: Record<ColorKeys, true> = {
  selectionColor: true,
  underlineColorAndroid: true,
  placeholderTextColor: true,
}

export const TextInput = forwardRef<rTextInput, DripsyTextInputProps>(
  function TextInput({ ...props }, ref) {
    const { theme } = useDripsyTheme()
    Object.keys(colorKeys).forEach((key) => {
      if (props[key] && theme?.colors && props[key] in theme.colors) {
        props[key] = theme.colors[props[key]]
      }
    })
    return <DripsyInput {...props} ref={ref} />
  }
)
