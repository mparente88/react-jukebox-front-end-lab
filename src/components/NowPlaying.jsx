const NowPlaying = ({ track }) => {
  if (!track) return null

  return (
    <div>
      <h2>Now Playing</h2>
      <p>
        {track.title} by {track.artist}
      </p>
    </div>
  )
}

export default NowPlaying
