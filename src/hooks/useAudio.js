import { useState, useRef, useEffect, useCallback } from 'react'

export const RECITERS = [
  { id: 'Husary_128kbps',               name: 'Mahmoud Al-Husary',   style: 'Slow & clear — best for learners ⭐' },
  { id: 'Alafasy_128kbps',              name: 'Mishary Al-Afasy',    style: 'Melodic & popular' },
  { id: 'Abdul_Basit_Murattal_192kbps', name: 'Abdul Basit',         style: 'Classical & powerful' },
  { id: 'Minshawi_Murattal_128kbps',    name: 'Al-Minshawi',         style: 'Warm & traditional' },
]

export const audioUrl = (reciterId, surah, ayah) =>
  `https://everyayah.com/data/${reciterId}/${String(surah).padStart(3,'0')}${String(ayah).padStart(3,'0')}.mp3`

export function useAudio() {
  const audioRef                    = useRef(null)
  const [reciterIdx, setReciterIdx] = useState(0)          // Al-Husary default
  const [playingKey, setPlayingKey] = useState(null)       // "surah-ayah"
  const [loading, setLoading]       = useState(false)
  const [progress, setProgress]     = useState(0)
  const [error, setError]           = useState(null)

  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio
    audio.oncanplay      = () => setLoading(false)
    audio.ontimeupdate   = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration * 100)
    }
    audio.onended        = () => { setPlayingKey(null); setProgress(0) }
    audio.onerror        = () => { setLoading(false); setError('Audio unavailable'); setPlayingKey(null) }
    return () => { audio.pause(); audio.src = '' }
  }, [])

  const play = useCallback((surah, ayah) => {
    const key = `${surah}-${ayah}`
    const url = audioUrl(RECITERS[reciterIdx].id, surah, ayah)
    const audio = audioRef.current
    audio.pause()
    audio.src = url
    setPlayingKey(key)
    setLoading(true)
    setProgress(0)
    setError(null)
    audio.load()
    audio.play().catch(() => setLoading(false))
  }, [reciterIdx])

  const stop = useCallback(() => {
    audioRef.current?.pause()
    setPlayingKey(null); setProgress(0)
  }, [])

  const toggle = useCallback((surah, ayah) => {
    const key = `${surah}-${ayah}`
    if (playingKey === key && audioRef.current && !audioRef.current.paused) stop()
    else play(surah, ayah)
  }, [play, stop, playingKey])

  const changeReciter = useCallback((idx) => {
    stop()
    setReciterIdx(idx)
  }, [stop])

  return { toggle, stop, play, playingKey, loading, progress, error, reciterIdx, changeReciter, reciter: RECITERS[reciterIdx] }
}
