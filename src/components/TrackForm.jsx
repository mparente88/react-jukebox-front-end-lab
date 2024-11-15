import { useState, useEffect } from "react"

const TrackForm = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "")
  const [artist, setArtist] = useState(initialData?.artist || "")

  useEffect(() => {
    setTitle(initialData?.title || "")
    setArtist(initialData?.artist || "")
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !artist.trim()) {
      alert("Both fields are required!")
      return
    }

    onSubmit({ title: title.trim(), artist: artist.trim() })
    if (!initialData) {
      setTitle("")
      setArtist("")
    }
  }

  return (
    <div>
      <h2>{initialData ? "Edit Track" : "Add New Track"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Track Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
        <button type="submit">
          {initialData ? "Update Track" : "Add Track"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  )
}

export default TrackForm
