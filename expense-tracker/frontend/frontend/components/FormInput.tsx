import React from 'react'
import { Controller, Control } from 'react-hook-form'
import { TextInput, HelperText } from 'react-native-paper'

interface FormInputProps {
  name: string
  control: Control<any>
  label: string
  secureTextEntry?: boolean
}

export default function FormInput({ name, control, label, secureTextEntry }: FormInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <>
          <TextInput
            label={label}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            mode="outlined"
            style={{ marginVertical: 8 }}
          />
          {error && <HelperText type="error">{error.message}</HelperText>}
        </>
      )}
    />
  )
}
