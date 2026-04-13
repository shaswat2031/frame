import { useEffect, useRef, useState } from 'react'
import { FaceMesh } from '@mediapipe/face_mesh'
import { Camera } from '@mediapipe/camera_utils'

export function useFaceMesh(videoRef) {
  const [landmarks, setLandmarks] = useState(null)
  const meshRef = useRef(null)
  const camRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    })

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6
    })

    faceMesh.onResults((results) => {
      if (results.multiFaceLandmarks?.[0]) {
        setLandmarks(results.multiFaceLandmarks[0])
      }
    })

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await faceMesh.send({ image: videoRef.current })
      },
      width: 640,
      height: 480
    })

    camera.start()
    meshRef.current = faceMesh
    camRef.current = camera

    return () => {
      camera.stop()
      faceMesh.close()
    }
  }, [videoRef])

  return landmarks
}
