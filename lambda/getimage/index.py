from pixivhunt.pixivdownloader import PixivDownloader
from pixivhunt.pixivapi import PixivAPI
import io
import re
import base64

DOMAIN = "https://www.pixiv.net"

def handler(event, context):
    para = event.get('pathParameters')
    artworkId = para.get('artworkId')
    return download(artworkId, 0, 'regular')


def download(artworkId, page_number, img_type):
    page_number = int(page_number)
    PD = PixivDownloader()
    artwork_profile = PD.pixiv_api.get_artwork_profile(artworkId)
    if img_type is None:
        img_type = 'original'
    img_url = artwork_profile['urls'][img_type]
    url = re.sub(r'(_p\d)', f'_p{page_number}', img_url)
    try:
        resp = PD.pixiv_session.get(url, referer=DOMAIN)
        image = base64.b64encode(resp.content).decode('utf-8')
        return {
                'headers': {
                    "Content-Type": "image/jpg",
                    "Access-Control-Allow-Origin": "*",
                },
                'statusCode': 200,
                'body': image,
                'isBase64Encoded': True
            }
    except Exception as e:
        print(e)
        return {
                'statusCode': 200,
                'body': "Error",
            }

if __name__ == '__main__':
    pass
