const { useState, useEffect } = React;

const Start = ({id, Game, save }) => {

    if (id>0) {
        var cont = true
        if (save==0) {
            var cont = false
        }
        var login = false;
    }
    else {
        var cont = false;
        var login = true;
    }

    return(
        <div className="center d-flex flex-column">
            <button className="bt p-2" onClick={() =>{Game(0)}}>NEW GAME</button>
            {cont && <button className="bt p-2" onClick={() =>{Game(1)}}>CONTINUE</button>}
            {login && <button className="bt p-2" onClick={() =>  window.location.href='/login'}>Login</button>}
            <button className="bt p-2">How to Play</button>
            <button className="bt p-2">About</button>
        </div>
    )
}

const Main = ({ save, saveGame }) => {

    const [bg, setBg] = useState('bg1')
    const [obj, setObj] = useState(['bg1','inv',0,'door1','door2','clock','db','mc1','text1'])
    const [items, setItem] = useState(['','','','','','','','','',])
    const [text, setText] = useState()
    const [speaking, setSpeaking] = useState(false)
    const [box,setBox] = useState({
        keyinv: false,
        paperinv: false
    })

    const openSave = () => {
        console.log("save: " + save)
        if (save==1) {
        setBg('bg1')
        setObj(['inv', 0, 'door1', 'door2', 'clock', 'db', 'mc1', 'dbclick'])
            setItem(['keyinv','','','','','','','','',])
        } 
        else if (save==2) {
            panel2()
        }
        else if (save==3) {
            panel2()
            setItem(['paperinv','','','','','','','','',])
        } 
        else if (save==4) {
            panel3()
            setItem(['paperinv','','','','','','','','',])
        } 
        else if (save==5) {
            panel4()
        }
    }

    const delAddObj = (d,a) => {
        var newObj = [...obj]
        if (d!=0) {
            newObj = obj.filter((o) => o!=d)
        }
        if (a!=0) {
            newObj.push(a)
        }
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
        newItem[n] = item
        setItem(newItem)
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
        setItem(finalItem)
    }
    
    const panel2 = () => {
        setBg('bg2')
        const newObj = ['inv','left1','mc2','paint',0]
        setObj(newObj)
    }
    
    const panel3 = () => {
        setBg('bg3')
        const newObj = ['inv','left2','right','mc3','nerd','text4']
        setObj(newObj)
    }

    const panel4 = () => {
        saveGame(5)
        setBg('end')
        setObj([])
        setTimeout(() => {
            setBg('endcard')
            setObj(['goback'])
        }, 10000);
    }

    const func = (item) => {
        var namelist = ['keyinv','paperinv']
        var funclist = [key,paper]
        for (var i=0;i<namelist.length;i++) {
            if (item == namelist[i]) {
                funclist[i]()
            }
        }
        if (box[item]) {
            setBox({...box, keyinv: false})
        } else {
            setBox({...box, keyinv: true})
        }
    }
    const key = () => {
        if (obj.includes('key')) {
            delAddObj('key',0)
        } else {
            delAddObj(0,'key')
        }
    }

    const paper = () => {
        delAddObj(0,'bigpaper');
        delFromInv('paperinv')
    }
    
    const [code, setCode] = useState('')
    const onSubmit = (e) => {
        e.preventDefault()

        onAdd({ code })
        setCode('')
    }

    const onAdd = ({ code }) => {
        if (code == 'PGBDYU') {
            delAddObj('input','goleft')
        } else {
            delAddObj('input','text6')
        }
    }

    const say = (thing) => {
        setText(thing)
        delAddObj(0,'text')
        setSpeaking(true)
    }

    const [open, setOpen] = useState(1)
    if (open>0){ 
        openSave()
        setOpen(open-1)
    }

    return (
        <div className="main">

            <div className={`bg ${bg}`}></div>

            {obj.includes('inv') &&
            <div className="inv d-flex flex-row">
            {items.map((item) => (
                <div className={`p-2 inv-box ${box[item] ? 'h':'' }`}>
                    <div className={item} onClick={() => func(item)} ></div>
                </div>
            ))}
            </div>
            }

            {obj.includes('door1') && <div className="door1" onClick={() => {if (!speaking) {say("It won't budge")}}}></div>}
            {obj.includes('door2') && <div className="door2" onClick={() => {if (obj.includes('key')) {panel2();delFromInv('keyinv');saveGame(2)} else {if (!speaking) {say("It's locked... Who would've guessed?")}}}}></div>}
            {obj.includes('clock') && <div className="clock" onClick={() => {if (!speaking) {say("The only thing faster than my math teacher...")}}}></div>}
            {obj.includes('db') && <div className="dustbin" onClick={() => {if (obj.includes('dbclick')) {addToInv('keyinv');delAddObj('dbclick',0);saveGame(1); if (!speaking) {say("Huh? What's a key doing here?")}}}}></div>}
            {obj.includes('mc1') && <div className="mc mc1"></div>}
            {obj.includes('text1') && <div className="text text1" onClick={() => {delAddObj('text1','text2')}}>I've been trapped here for hours</div>}
            {obj.includes('text2') && <div className="text text1" onClick={() => {delAddObj('text2','text3')}}>Who thought detention would be this bad</div>}
            {obj.includes('text3') && <div className="text text1" onClick={() => {setSpeaking(false),delAddObj('text3','dbclick')}}>I need to find a way out . . .</div>}
            {obj.includes('text') && <div className="text text1" onClick={() => {setSpeaking(false),delAddObj('text',0)}}>{text}</div>}
            
            {obj.includes('mc2') && <div className="mc mc2"></div>}
            {obj.includes('left1') && <div className="left left1" onClick={() => {if (obj.includes('bigpaper')) {addToInv('paperinv'); saveGame(4)}; panel3(); if (items.includes('paperinv')) {saveGame(4)};}}></div>}
            {obj.includes('paint') && <div className="paint" onClick={() => {if (!items.includes('paperinv')) {delAddObj('paint','behind')}}}></div>}
            {obj.includes('behind') && <div className="behind"></div>}
            {obj.includes('behind') && <div className="paper" onClick={() => {delAddObj('behind','paint');addToInv('paperinv');saveGame(3);}}></div>}
            {obj.includes('bigpaper') && <div className="bigpaper" onClick={() => {delAddObj('bigpaper',0),addToInv('paperinv')}}></div>}

            {obj.includes('left2') && <div className="left left2" onClick={() => {if (obj.includes('goleft')) {panel4()}}}></div>}
            {obj.includes('right') && <div className="right" onClick={() => {panel2()}}></div>}
            {obj.includes('mc3') && <div className="mc mc3"></div>}
            {obj.includes('nerd') && <div className="nerd"></div>}
            {obj.includes('text4') && <div className="text text4" onClick={() => delAddObj('text4','text5')}>You shall not pass!</div>}
            {obj.includes('text5') && <div className="text text4" onClick={() => delAddObj('text5','input')}>*whispers* Unless you know the secret code...</div>}
            {obj.includes('input') && <form className="form" onSubmit={onSubmit}>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
                <input type="submit" />
            </form>}
            {obj.includes('goleft') && <div className="text text4" onClick={() => panel4()}>hehe go right ahead...</div>}
            {obj.includes('text6') && <div className="text text4" onClick={() => panel2()}>WRONG CODE! GO BACK!</div>}
            {obj.includes('goback') && <div className="goback" onClick={() => window.location.reload()}> Main Menu</div>}
        </div>
    )
}

function App() {

    const [save, setSave] = useState(0)
    const [main, setMain] = useState(false)
    const [start, setStart] = useState(false)

    const id = document.querySelector('#id').innerHTML

    const saveGame = (num) => {
        
        console.log("saving save no."+num)
        if (id>0) {
            fetch(`http://127.0.0.1:8000/save/${id}`, {
                headers: {
                    'X-CSRFToken': csrf_token
                },
                method: 'POST',
                body: JSON.stringify({
                    data: num
                })
            })
        }
    }

    const Game = (num) => {
        if (num!=0 && id>0) {
            console.log('fetching save')
            fetch(`http://127.0.0.1:8000/save/${id}`)
           .then(response => response.json())
           .then(res => {
               num = res.savenum
               console.log('fetched save no.'+num)
               setSave(num)
               setMain(true)
           })
        } else {
            saveGame(0)
            setSave(0)
            setMain(true)
        }
    }
    
    const START = () => {
        if (id>0) {
        fetch(`http://127.0.0.1:8000/save/${id}`)
        .then(response => response.json())
        .then(res => {
            var save = res.savenum
            setSave(save)
            console.log('fetched save no.'+save)
            setStart(true)
        })}
        else {setStart(true)}
    }

    const [once, setOnce] = useState(true)
    if (once) {
        setOnce(false)
        START()
    }

    return (
        <div>
            <div className="main">
                {!main && start && <div className="startbg">
                    <Start id={id} Game={Game} START={START} save={save} />
                </div>}
            </div>
            {main && <div>
                <Main save={save} saveGame={saveGame} />
            </div>}
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector("#app"));