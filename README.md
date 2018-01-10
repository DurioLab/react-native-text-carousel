# Setup

This libray is available on npm, install it with:
`npm install --save react-native-text-carousel`
or
`yarn add react-native-text-carousel`

# Usage

1. Import react-native-text-carousel

```js 
import TextCarousel from react-native-text-carousel
```

2. Render

```jsx
render(){
    return  (<View>
    <TextCarousel>
      <TextCarousel.Item>
        <View><Text>1111111</Text></View>
      </TextCarousel.Item>
      <TextCarousel.Item>
        <View><Text>22222222</Text></View>
      </TextCarousel.Item>
      <TextCarousel.Item>
        <View><Text>33333333</Text></View>
      </TextCarousel.Item>
    </TextCarousel>
    </View>)
}
```

# Available props

| Name        | Type           | Default  | Description |
| ------------- |:-------------:| :-----:| -----: |
|   height    | number | 40 | Height for container |
|  interval      | number      |   4000 | Loop interval time |
| direction | string     |    'up' | Direction |