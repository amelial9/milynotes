declare module 'virtual:note-dates' {
  /** `<vault folder>/<relative path>.md` → ISO date the note was first added */
  const dates: Record<string, string>
  export default dates
}
