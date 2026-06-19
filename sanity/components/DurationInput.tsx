/**
 * Custom Duration Input Component
 * Provides a user-friendly interface for entering song duration
 */

import React, { useCallback } from 'react'
import { StringInputProps, set, unset } from 'sanity'
import { Stack, Text, TextInput } from '@sanity/ui'

export function DurationInput(props: StringInputProps) {
  const { value, onChange, elementProps } = props

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.currentTarget.value
      onChange(inputValue ? set(inputValue) : unset())
    },
    [onChange]
  )

  return (
    <Stack space={2}>
      <TextInput
        {...elementProps}
        value={value || ''}
        onChange={handleChange}
        placeholder="4:30"
      />
      <Text size={1} muted>
        Format: MM:SS (e.g., 4:30 for 4 minutes 30 seconds)
      </Text>
      {value && !/^\d{1,2}:\d{2}$/.test(value) && (
        <Text size={1} style={{ color: 'var(--card-badge-caution-fg-color)' }}>
          ⚠️ Invalid format. Use MM:SS (e.g., 4:30)
        </Text>
      )}
    </Stack>
  )
}
