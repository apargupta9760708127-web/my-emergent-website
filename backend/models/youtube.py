from pydantic import BaseModel
from typing import List

class FeaturedVideo(BaseModel):
    id: str
    title: str
    thumbnail: str
    url: str
    views: str

class YouTubeChannel(BaseModel):
    id: str
    channelName: str
    channelUrl: str
    subscribers: str
    description: str
    featuredVideos: List[FeaturedVideo]

class FeaturedVideoDB(BaseModel):
    title: str
    thumbnail: str
    url: str
    views: str

class YouTubeChannelDB(BaseModel):
    channelName: str
    channelUrl: str
    subscribers: str
    description: str
    featuredVideos: List[FeaturedVideoDB]
