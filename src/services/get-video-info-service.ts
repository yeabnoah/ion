import axios from "axios"
import type { VideoStatsType } from "../types/get-video-info-type"

const getVideoInfo = async(videoId: string): Promise<VideoStatsType> => {
    const response = await axios.get(`https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`)  
    
    return response.data as VideoStatsType
}

export default getVideoInfo