const { useState } = React;

const Main = ({ bgProp }) => {


    const [obj, setObj] = useState(['bg2','door1','door2','clock','db','mc','start'])
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
