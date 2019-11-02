# Controlling Google cast devices programmatically (e.g. Chromecast and Home)

[pychromecast](https://github.com/balloob/pychromecast) has the code for controlling the cast device. It becomes very simple with it, just install it from pip `pip install pychromecast` and then follow along:

```bash
$ python
Python 3.7.3 (v3.7.3:ef4ec6e, Jul 18 2019, 21:03:00)
[GCC 4.9.2] on linux
Type "help", "copyright", "credits" or "license" for more information.
```
```python
>>> import time
>>> import pychromecast
>>> chromecasts = pychromecast.get_chromecasts()
>>> chromecasts
[Chromecast('192.168.0.13', port=8009, device=DeviceStatus(friendly_name='Living Room Speaker', model_name='Google Nest Mini', manufacturer='Unknown manufacturer', uuid=UUID('f7033a0a-9fc6-1846-9ed8-ee2d88521f65'), cast_type='cast')), Chromecast('192.168.0.13', port=42834, device=DeviceStatus(friendly_name='Test', model_name='Google Cast Group', manufacturer='Unknown manufacturer', uuid=UUID('0e008ac1-4d6b-4545-80e0-1c703a7c775c'), cast_type='group'))]
>>> [cc.device.friendly_name for cc in chromecasts]
['Living Room Speaker', 'Test']
>>> cast = next(cc for cc in chromecasts if cc.device.friendly_name == "Living Room Speaker")
>>> cast
Chromecast('192.168.0.13', port=8009, device=DeviceStatus(friendly_name='Living Room Speaker', model_name='Google Nest Mini', manufacturer='Unknown manufacturer', uuid=UUID('f7033a0a-9fc6-1846-9ed8-ee2d88521f65'), cast_type='cast'))
>>> print(cast.device)
DeviceStatus(friendly_name='Living Room Speaker', model_name='Google Nest Mini', manufacturer='Unknown manufacturer', uuid=UUID('f7033a0a-9fc6-1846-9ed8-ee2d88521f65'), cast_type='cast')
>>> cast.device.friendly_name
'Living Room Speaker'
>>> cast.wait()
>>> print(cast.device)
DeviceStatus(friendly_name='Living Room Speaker', model_name='Google Nest Mini', manufacturer='Unknown manufacturer', uuid=UUID('f7033a0a-9fc6-1846-9ed8-ee2d88521f65'), cast_type='cast')
>>> print(cast.status)
CastStatus(is_active_input=False, is_stand_by=True, volume_level=0.30000001192092896, volume_muted=False, app_id='CC32E753', display_name='Spotify', namespaces=['urn:x-cast:com.google.cast.debugoverlay', 'urn:x-cast:com.google.cast.cac', 'urn:x-cast:com.spotify.chromecast.secure.v1', 'urn:x-cast:com.google.cast.test', 'urn:x-cast:com.google.cast.broadcast', 'urn:x-cast:com.google.cast.media'], session_id='43d9042c-3d6e-4a05-aec6-06682f9f0e5d', transport_id='43d9042c-3d6e-4a05-aec6-06682f9f0e5d', status_text='Spotify', icon_url='https://lh3.googleusercontent.com/HOX9yqNu6y87Chb1lHYqhKVTQW43oFAFFe2ojx94yCLh0yMzgygTrM0RweAexApRWqq6UahgrWYimVgK')
>>> mc = cast.media_controller
# Get an URL to an mp4 video
>>> media_url = "https://r6---sn-jvhixh-5go6.googlevideo.com/videoplayback?expire=1572732827&ei=O6u9Xf-gDsWBhAetzI3IDA&ip=185.27.134.50&id=o-AKt2dwvxIXleT5YfxQ0EYLIRT-aUV6Rtkio0gzk8vrgO&itag=22&source=youtube&requiressl=yes&mime=video%2Fmp4&ratebypass=yes&dur=917.768&lmt=1572418007364260&fvip=6&fexp=23842630&c=WEB&txp=5535432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRgIhALD9kMpaG8nqIMSpEz5e5PTlLeW48TMTqx7MPlrqg92MAiEAvNAAQrfixl4acN2-m2eVrneCMRsgbLG9IG_bJDPRggA%3D&redirect_counter=1&rm=sn-aigezz7d&req_id=24c4935b3749a3ee&cms_redirect=yes&ipbypass=yes&mip=80.216.68.127&mm=31&mn=sn-jvhixh-5go6&ms=au&mt=1572711125&mv=m&mvi=5&pcm2cms=yes&pl=19&lsparams=ipbypass,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AHylml4wRgIhAJfnlLfRghpCGUSOrEQKNmIgFzqdcMKILzv0Fo66EwK5AiEA2iMdvpfojKnQ1WcSaG9Vfk_j79EBdrHiPC_HuKpxBqQ="
>>> mc.play_media(media_url, 'video/mp4')
>>> mc.block_until_active()
>>> print(mc.status)
<MediaStatus {'metadata_type': None, 'title': None, 'series_title': None, 'season': None, 'episode': None, 'artist': None, 'album_name': None, 'album_artist': None, 'track': None, 'subtitle_tracks': [{'trackId': 1, 'type': 'VIDEO'}], 'images': [], 'supports_pause': True, 'supports_seek': True, 'supports_stream_volume': True, 'supports_stream_mute': True, 'supports_skip_forward': False, 'supports_skip_backward': False, 'current_time': 1.055187, 'content_id': 'https://r6---sn-jvhixh-5go6.googlevideo.com/videoplayback?expire=1572732827&ei=O6u9Xf-gDsWBhAetzI3IDA&ip=185.27.134.50&id=o-AKt2dwvxIXleT5YfxQ0EYLIRT-aUV6Rtkio0gzk8vrgO&itag=22&source=youtube&requiressl=yes&mime=video%2Fmp4&ratebypass=yes&dur=917.768&lmt=1572418007364260&fvip=6&fexp=23842630&c=WEB&txp=5535432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRgIhALD9kMpaG8nqIMSpEz5e5PTlLeW48TMTqx7MPlrqg92MAiEAvNAAQrfixl4acN2-m2eVrneCMRsgbLG9IG_bJDPRggA%3D&redirect_counter=1&rm=sn-aigezz7d&req_id=24c4935b3749a3ee&cms_redirect=yes&ipbypass=yes&mip=80.216.68.127&mm=31&mn=sn-jvhixh-5go6&ms=au&mt=1572711125&mv=m&mvi=5&pcm2cms=yes&pl=19&lsparams=ipbypass,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AHylml4wRgIhAJfnlLfRghpCGUSOrEQKNmIgFzqdcMKILzv0Fo66EwK5AiEA2iMdvpfojKnQ1WcSaG9Vfk_j79EBdrHiPC_HuKpxBqQ=', 'content_type': 'video/mp4', 'duration': 917.699048, 'stream_type': 'BUFFERED', 'idle_reason': None, 'media_session_id': 1, 'playback_rate': 1, 'player_state': 'PLAYING', 'supported_media_commands': 274447, 'volume_level': 1, 'volume_muted': False, 'media_custom_data': {}, 'media_metadata': {}, 'current_subtitle_tracks': [], 'last_updated': datetime.datetime(2019, 11, 2, 16, 14, 33, 902682)}>
>>> mc.pause()
>>> mc.play()
```

## MP4 link for youtube video
If you want to get the mp4 link for a video on youtube, then you can use the following service http://youlink.epizy.com/?url=https://www.youtube.com/watch?v=%5BID%5D (taken from [this SO answer](https://stackoverflow.com/a/49687760/4713758)). These can be casted to home devices as well (only sound).

