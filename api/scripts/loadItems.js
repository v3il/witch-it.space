import axios from 'axios'
import sharp from 'sharp'
import ImageKit from 'imagekit'
import { Item } from '../models/index.js'
import { items } from './items'

const imagekit = new ImageKit({
    publicKey: 'public_gIyV+AwKgzNdUqvjfVAzge+lhIc=',
    privateKey: 'private_cvQeg/8h5qsuBHMn5zXFI7aGpWU=',
    urlEndpoint: 'https://ik.imagekit.io/igo1qzk1oe2z'
});

(async function () {
    try {
        for (const item of items) {
            await processItem(item)
        }

        process.exit(0)
    } catch (e) {
        console.error(e)
    }
})()

async function processItem (item) {
    try {
        if (item.imgUrl) {
            // await downloadImage(item.imgUrl, item.itemId)
        }

        const { imgUrl, ...propsToStore } = item

        await saveItem(propsToStore)

        console.log(`Item "${item.name}" successfully processed`)
    } catch (e) {
        console.error(`Item "${item.name}" processing failed: `, e.message)
    }
}

async function downloadImage (imgUrl, imageName) {
    const response = await axios.get(imgUrl, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data, 'utf-8')

    const resizedImageBuf = await sharp(buffer)
        .resize(150)
        .sharpen()
        .webp()
        .toBuffer()

    await imagekit.upload({
        file: `data:image/webp;base64,${resizedImageBuf.toString('base64')}`,
        fileName: `${imageName}.webp`,
        folder: '/items',
        useUniqueFileName: false,
        overwriteFile: true
    }).then((response) => {
        console.log(`${imageName}.webp uploaded`)
    }).catch((error) => {
        console.log(`${imageName}.webp not uploaded`, error)
    })
}

async function saveItem (normalizedItemData) {
    const { itemId, ...otherProps } = normalizedItemData
    const itemInDb = await Item.query().findById(itemId)

    if (itemInDb) {
        return Item.query().patch(otherProps).findById(itemId)
    }

    return Item.query().insert(normalizedItemData)
}
