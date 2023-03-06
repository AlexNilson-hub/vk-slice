import bridge from '@vkontakte/vk-bridge'

export const postStories = async (data: any) => {
  await bridge.send('VKWebAppShowStoryBox', {
    background_type: 'image',
    blob: data,
    attachment: {
      text: 'book',
      type: 'photo',
      owner_id: 0,
      id: 0,
    },
  })
}
