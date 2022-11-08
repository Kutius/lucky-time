export const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'is-dark',
  valueLight: '',
})
export const toggleDark = useToggle(isDark)
