const { useState } = React;

const Main = ({ bgProp }) => {


    const [obj, setObj] = useState(['bg1','door1','door2','clock','db','mc','start'])
    const [items, setItem] = useState(['','','','','','','','','',])

    const delAddObj = (d,a) => {
        var newObj = [...obj]
        if (d!=0) {
            newObj = obj.filter((o) => o!=d)
        }
        if (a!=0) {
            newObj.push(a)
        }
        console.log(newObj)
        setObj(newObj)
    }
    
    const panel2 = () => {
        bgProp('bg2')
        const newObj = ['mc','paint']
        setObj(newObj)
    }
    
    const addToInv = (item) => {
        const newItem = [...items]
        var n = 0;
        for (var i=0;i<newItem.length;i++) {
            var p = newItem[i]
            if (p=='') {
                n = i;
                break
            }
        }
        console.log(n)
        newItem[n] = item
        console.log(newItem)
        setItem(items => newItem)
    }


    return (
        <div class="main">
            
            <div className="inv d-flex flex-row">
            {items.map((item) => (
                <div className="p-2 inv-box">
                    <div className={item}></div>
                </div>
            ))}
            </div>

            {/*Objects added in between will affect the position of all following objects*/}

            {obj.includes('bg1') && <div className="bg1"></div>}
            {obj.includes('bg2') && <div className="bg2"></div>}
            {obj.includes('door1') && <div className="door1"></div>}
            {obj.includes('door2') && <div className="door2" onClick={() => {if (obj.includes('key')) {panel2()}}}></div>}
            {obj.includes('clock') && <div className="clock"></div>}
            {obj.includes('db') && <div className="dustbin" onClick={() => {if (obj.includes('dbclick')) {delAddObj('dbclick','dbtext'),addToInv('keyinv')}}}></div>}
            {obj.includes('mc') && <div className="mc"></div>}
            {obj.includes('start') && <button className="btn1" onClick={() => delAddObj('start','text1')} >Start</button>}
            {obj.includes('text1') && <div className="text text1" onClick={() => {delAddObj('text1','text2')}}>I've been trapped here for hours</div>}
            {obj.includes('text2') && <div className="text text1" onClick={() => {delAddObj('text2','text3')}}>Who thought detention would be this bad</div>}
            {obj.includes('text3') && <div className="text text1" onClick={() => {delAddObj('text3','dbclick')}}>I need to find a way out . . .</div>}
            {obj.includes('dbtext') && <div className="text text1" onClick={() => {delAddObj('dbtext','key')}}>Huh? What's a key doing here?</div>}
            {obj.includes('paint') && <div className="paint"></div>}
            
            {/* {obj.includes(2) && <div><button className="ckbtn" onClick={() => {addToInv('cookinv'), delAddObj(2,0)}}><div className="cookie"></div></button></div>} */}

        </div>
    )
}

function App() {

    const [bg, setBg] = useState('bg2')
    console.log(bg)

    return (
        <div>
            <Main bgProp={setBg} />
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector("#app"));

// const addObj = (num) => {
//     const newObj = obj.concat(num) 
//     setObj(newObj)
//     console.log(obj)
// }

// const delObj = (num) => {
//     console.log(obj)
//     const newObj = obj.filter((o) => o!=num)
//     setObj(newObj)
//     console.log(newObj)
// }


// const Add = (a) => {
//     var newObj = [...obj]
//     a.map((i) => newObj.push(i))
//     console.log(newObj)
//     setObj(newObj)
//     console.log(obj)
// }

// const Del = (d) => {
//     // where d is an array
//     // var newObj = []
//     // for (var i=0;i<obj.length;i++) {
//     //     if (d.includes(obj[i])==false) {
//     //         newObj.push(obj[i])
//     //     }
//     //     else {
//     //         console.log(obj[i])
//     //     }
//     // }
//     // console.log(newObj)
//     // setObj(newObj)
//     const newObj = obj.filter((o) => o!=d)
//     console.log(newObj)
//     setObj(newObj)
// }
