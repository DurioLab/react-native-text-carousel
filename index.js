/**
 * 文字跑马灯
 * Author : Arno Ma
 */
import React from 'react';
import PropTypes, { func } from 'prop-types';
import { StyleSheet, View, Animated, Easing } from 'react-native';


class TextCarousel extends React.PureComponent {

  constructor(props){
    super(props);
    
    this.state = {
      anim: new Animated.ValueXY({x:0,y:-props.height})
    }

  }

  render(){
    let {height} = this.props;
    let children = this.formatChildren();
    let scrollH = children.length * height;
    
    this.current = 1
    this.total = children.length
    
    return <View style={[styles.container,{height}]}>
      <Animated.View style={[styles.scrollView, 
        { height: scrollH, transform: this.state.anim.getTranslateTransform() }]}>
        { this.formatChildren() }
      </Animated.View>
    </View> 
  }

  componentDidMount(){
    let {duration, height, direction} = this.props;
    let isUp = direction === 'up';

    let cloneIndex = isUp ? this.total - 1 : 0;
    let resetIndex = isUp ? 1 : this.total - 2;
    let directionValue = isUp ? 1 : -1;

    this.timer = setInterval(()=>{

      this.current += directionValue
      
      Animated.timing( this.state.anim, { 
          toValue: { x: 0, y: -this.current * height },
          duration: 500,
          easing: Easing.out(Easing.ease)
      }).start(()=>{
        
        if ( this.current === cloneIndex ) {
          this.current = resetIndex
          Animated.timing(this.state.anim,{
            toValue: {x:0, y: -this.current * height},
            duration: 0
          }).start()
        }

      });

    }, duration);
  }


  componentWillMount(){
    this.timer && clearInterval(this.timer);
  }

  formatChildren(){
    let {children, height} = this.props;
    var result = [];

    React.Children.forEach(children, (child, index)=>{
      if (React.isValidElement(child) && child.type === Item){
        result.push(
          <View key={`tc-${index}`} style={{height}}>
            {child}
          </View>
        )
      }
    })

    // 克隆第一和最后一个元素
    if (result.length > 0){
      let firstItem = result[0]
      let lastItem = result[result.length - 1]
      result.unshift(React.cloneElement(lastItem, { key: `${lastItem.key}-last`}))
      result.push(React.cloneElement(firstItem, { key: `${firstItem.key}-first`}))
    }

    return result
  }

}

TextCarousel.defaultProps = {
  height: 40,
  duration: 4000,
  direction: 'up'
}

TextCarousel.propTypes = {
  height: PropTypes.number,
  duration: PropTypes.number,
  direction: PropTypes.oneOf(['up','down'])
}

class Item extends React.PureComponent {
  render(){
    return (
      <View style={styles.itemStyle}>
        { React.Children.only(this.props.children) }
      </View>
    )
  }
}

TextCarousel.Item = Item;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow:'hidden'
  },
  itemStyle: {
    flex:1
  },
  scrollView: {
  }
})

export default TextCarousel;