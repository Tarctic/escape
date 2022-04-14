const { useState } = React;

const Main = ({ bgProp }) => {


    const [obj, setObj] = useState(['inv',0,'door1','door2','clock','db','mc1','start'])
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

    const delFromInv = (item) => {
        const newItem = [...items]
        var finalItem = []
        for (var i=0;i<newItem.length;i++) {
            var p = newItem[i]
            if (p!=item) {
                finalItem.push(p)
            }
            else {
                finalItem.push('')
            }
        }
        console.log(finalItem)
        setItem(items => finalItem)
    }
    
    const panel2 = () => {
        bgProp('bg2')
        const newObj = ['inv','left1','mc2','paint',0]
        setObj(obj => newObj)
    }
    
    const panel3 = () => {
        bgProp('bg3')
        const newObj = ['inv','left2','right','mc3','nerd','text4']
        setObj(obj => newObj)
    }

    const panel4 = () => {
        bgProp('bg4')
        const newObj = ['end']
        setObj(obj => newObj)
        setTimeout(() => {
            const finalObj = ['endcard']
            setObj(obj => finalObj)
        }, 10000);
    }

    const func = (item) => {            
        console.log(item)
        var namelist = ['keyinv','paperinv']
        var funclist = [key,paper]
        for (var i=0;i<namelist.length;i++) {
            if (item == namelist[i]) {
                funclist[i]()
            }
        }
    }
    const key = () => {
        delAddObj(0,'key')
    }

    const paper = () => {
        delAddObj(0,'bigpaper');
        delFromInv('paperinv')
    }
    
    const [text, setText] = useState('')
    const onSubmit = (e) => {
        e.preventDefault()

        onAdd({ text })
        setText('')
    }

    const onAdd = ({ text }) => {
        if (text == 'PGBDYU') {
            delAddObj('input','goleft')
        } else {
            delAddObj('input','text7')
        }
    }

    return (
        <div class="main">
            {obj.includes('inv') &&
            <div className="inv d-flex flex-row">
            {items.map((item) => (
                <div className="p-2 inv-box">
                    <div className={item} onClick={() => func(item)}></div>
                </div>
            ))}
            </div>
            }

            {/*Objects added will affect the position of all objects below them*/}

            {obj.includes('door1') && <div className="door1"  ></div>}
            {obj.includes('door2') && <div className="door2" onClick={() => {if (obj.includes('key')) {panel2(),delFromInv('key')}}}></div>}
            {obj.includes('clock') && <div className="clock"></div>}
            {obj.includes('db') && <div className="dustbin" onClick={() => {if (obj.includes('dbclick')) {delAddObj('dbclick','dbtext'),addToInv('keyinv')}}}></div>}
            {obj.includes('mc1') && <div className="mc mc1"></div>}
            {obj.includes('start') && <button className="start" onClick={() => delAddObj('start','text1')} >Start</button>}
            {obj.includes('text1') && <div className="text text1" onClick={() => {delAddObj('text1','text2')}}>I've been trapped here for hours</div>}
            {obj.includes('text2') && <div className="text text1" onClick={() => {delAddObj('text2','text3')}}>Who thought detention would be this bad</div>}
            {obj.includes('text3') && <div className="text text1" onClick={() => {delAddObj('text3','dbclick')}}>I need to find a way out . . .</div>}
            {obj.includes('dbtext') && <div className="text text1" onClick={() => {delAddObj('dbtext',0)}}>Huh? What's a key doing here?</div>}
            
            {obj.includes('mc2') && <div className="mc mc2"></div>}
            {obj.includes('left1') && <div className="left left1" onClick={() => {panel3()}}></div>}
            {obj.includes('paint') && <div className="paint" onClick={() => {if (!items.includes('paperinv')) {delAddObj('paint','behind')}}}></div>}
            {obj.includes('behind') && <div className="behind"></div>}
            {obj.includes('behind') && <div className="paper" onClick={() => {delAddObj('behind','paint'),addToInv('paperinv')}}></div>}
            {obj.includes('bigpaper') && <div className="bigpaper" onClick={() => {delAddObj('bigpaper',0),addToInv('paperinv')}}></div>}

            {obj.includes('left2') && <div className="left left2" onClick={() => {if (obj.includes('goleft')) {panel4()}}}></div>}
            {obj.includes('right') && <div className="right" onClick={() => {panel2()}}></div>}
            {obj.includes('mc3') && <div className="mc mc3"></div>}
            {obj.includes('nerd') && <div className="nerd"></div>}
            {obj.includes('text4') && <div className="text text4" onClick={() => delAddObj('text4','text5')}>You shall not pass!</div>}
            {obj.includes('text5') && <div className="text text4" onClick={() => delAddObj('text5','input')}>*whispers* Unless you know the secret code...</div>}
            {obj.includes('input') && 
                <form className="form" onSubmit={onSubmit}>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
                    <input type="submit" />
                </form>
            }
            {obj.includes('goleft') && <div className="text text4" onClick={() => delAddObj('text6',0)}>hehe go right ahead...</div>}
            {obj.includes('text7') && <div className="text text4" onClick={() => delAddObj('text7',0)}>WRONG CODE! GO BACK!</div>}
            {obj.includes('end') && <div className="end"></div>}
            {obj.includes('endcard') && <div className="endcard"></div>}


            {/* {obj.includes(2) && <div><button className="ckbtn" onClick={() => {addToInv('cookinv'), delAddObj(2,0)}}><div className="cookie"></div></button></div>} */}

        </div>
    )
}

function App() {

    const [bg, setBg] = useState('bg1')
    console.log(bg)

    return (
        <div className={bg}>
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
