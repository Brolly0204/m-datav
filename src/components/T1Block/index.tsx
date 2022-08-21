import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components';
import gsap from 'gsap'
import api from "@/common/api";

const itemHeight = 50;
const duration = 500;
const RollCardItemStyle = styled.div<{ height: number }>`
  padding-top: ${(props) => props.height / 2 + "px"};
  overflow: hidden;
`;
const RollCardItemWrap = styled.div<{ height: number; totalHeight: number }>`
  height: ${(props) => props.totalHeight + "px"};

  position: relative;
`;
const RollCardItem = styled.div<{ height: number; index: number }>`
  height: ${(props) => props.height + "px"};
  line-height: ${(props) => props.height + "px"};
  font-size: 20px;
  transform: translate3d(0, 0, 0);
  position: absolute;
  left: 0;
  top: ${(props) => props.index * itemHeight + "px"};
  width: 100%;
  border: 1px solid burlywood;
`;

export default function () {
  const [productList, setProduct] = useState<productModel.Datum[]>([])
  const retryCountRef = useRef(3)
  const pageInfoRef = useRef({
    pageSize: 10,
    current: 1,
    total: 0
  })
  const currentTranslateRef = useRef(0);
  const [currentTranslateState, setCurrentTranslateState] = useState(0);

  const getProductList = (current?: number) => {
    const c = current || pageInfoRef.current.current;
    // 一次性请求两页,可能到头了
    if (
      c !== 1 &&
      c  * pageInfoRef.current.pageSize -pageInfoRef.current.total > pageInfoRef.current.pageSize
    ) {
      // debugger
      return Promise.reject({});
    }
    return new Promise((resolve, reject) => {
      api
        .invoke<productModel.RootObject>("get", "/v1/products/list", {
          pageSize: pageInfoRef.current.pageSize,
  
          current: c,
        })
        .then(
          (res) => {
            pageInfoRef.current.current = res.current;
            pageInfoRef.current.total = res.total;
            retryCountRef.current = 3;
            if (res.current === 1) {
              setProduct(res.data);
            } else {
              setProduct((pro) => pro.concat(res.data));
            }
  
            resolve({});
          },
          () => {
            if (retryCountRef.current) {
              // 接口报错了,从头开始
              retryCountRef.current--;
              currentTranslateRef.current = 0;
              pageInfoRef.current = {
                pageSize: 10,
                current: 1,
                total: 0,
              };
              setTimeout(() => {
                init(1);
              }, 1000);
            }
          }
        );
    });
  };

  const init = (start: number) => {
    getProductList(start).then(() => {
      getProductList(start + 1)
      if (pageInfoRef.current.current === 1) {
        setTimeout(() => {
          startGsap()
        }, duration)
      }
    })
  }

  const startGsap = () => {
    currentTranslateRef.current += 1
    gsap.to('.RollCardItem', {
      duration: duration / 1000,
      opacity: (_: number, target) => {
        const index = Number(target.tabIndex)
        if (currentTranslateRef.current - 1 === index) {
          return 0
        }
        return 1
      },
      top: (_: number, target) => {
      // console.log('target', target.tabIndex, target)
      const index = Number(target.tabIndex)
      const rpx = -currentTranslateRef.current * itemHeight + index * itemHeight + 'px'
      console.log('rpx', rpx)
      return rpx
    },
    onComplete: () => {
      // setTimeout(() => {
      //   startGsap()
      // }, duration)
    }
   })
  }

  const firstRenderRef = useRef(true); 
  useEffect(() => { // React.StrictMode严格模式下会执行两次
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    console.log('useEffect')
    init(1)
  }, [])
  return (
    <RollCardItemStyle height={itemHeight}>
      <RollCardItemWrap
        className='RollCardItemWrap'
        totalHeight={itemHeight * (pageInfoRef.current.pageSize - 2)}
        height={itemHeight}
      >
        {
          (productList || []).map((p, index) => {
            return (
              <RollCardItem
                className={"RollCardItem RollCardItem" + index}
                key={p.id + p.name}
                tabIndex={index}
                index={index}
                height={itemHeight}
              >
                i{index} {p.name}
              </RollCardItem>
            )
          })
        }
      </RollCardItemWrap>
    </RollCardItemStyle>
  )
}
