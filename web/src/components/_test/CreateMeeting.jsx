import { useEffect, useState } from "react"

const SelectionArea = ({venueData, getData})=>{
    const result = venueData.reduce((acc, curr)=>{
        (acc[curr.area] =  acc[curr.area] || []).push(curr)
        return acc
    }, {})
    const obj = Object.keys(result)
    const area = { areas : obj}
    return (
        <div>
            <label htmlFor="areas">Area</label>
            <select name="areas" id="areas" 
            onChange={(e)=>{
                getData(e.target.value)
            }}> 
                <option defaultValue={""} >Selecte Area</option>
                {area.areas.map((item, index)=>{
                    return(
                        <option value={item} key={index}>{item}</option>
                    )
                })}
            </select>
        </div>
    )

}

const SelectionRoom = ({venueData, selectedArea, getData})=>{
    const filteredData = venueData.filter(data =>{
        return data.area.toLowerCase().includes(selectedArea.toLowerCase())
    })
    return (
        <div>
            <label htmlFor="rooms">Room</label>
            <select name="rooms" id="rooms" 
                onChange={(e)=>{
                    getData(e.target.value)
                }}>
                <option defaultValue={""}>Selecte Room</option>
                {filteredData.map((item, index)=>{
                    return(
                        <option value={item.id} key={index}>{item.room}</option>
                    )
                })}
            </select>
        </div>
    )
}


export default function CreateMeeting(){
        const [uctDate, setUCTDate] = useState("")
        const [areaSelected, setAreaSelected] = useState("")
        const [roomIdSelected, setRoomIdSelected] = useState("")
        const [formData, setFormData] = useState({
                title: "",
                description: "",
                date: "",
                day: "",
                start: "",
                end: "",
                venue_id: ""
            })
        
        let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let uct = new Date(formData.date).getUTCDay()
        const getDataArea = (data) =>{setAreaSelected(data)}
        const getDataRoomId = (data) =>{setRoomIdSelected(data)}
        
        useEffect(()=>{
            setUCTDate(uct)
            setFormData({...formData, day: weekday[uctDate]})
        }, [uct, uctDate])
        useEffect(()=>{
            setFormData({...formData, venue_id:roomIdSelected})   
        }, [roomIdSelected])

        function handleSubmit(e){ 
            e.preventDefault()
            console.log(formData)
        }

            return(
                <div className="create-meeting-container">

                    <h2>Create A Meeting</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-part1">
                            <label htmlFor="title">Title</label>
                            <input 
                                type="text" 
                                id="title" 
                                onChange={(e)=>{
                                    setFormData({...formData, title: e.target.value})
                                }}
                            required/>

                            <label htmlFor="password">Description</label>
                            <textarea 
                                type="text-area" 
                                id="description" 
                                onChange={(e)=>{
                                    setFormData({...formData, description: e.target.value})
                                }}
                                required/>
                        </div>
                        <div className="form-part2">
                            <div>
                                <label htmlFor="date">Date</label>
                                <input 
                                    type="date" 
                                    id="date"
                                    onChange={(e)=>{
                                        setFormData({...formData, date: e.target.value})
                                    }} 
                                    required/>

                                <label htmlFor="day">Day</label>
                                <input 
                                    type="text" 
                                    id="day" 
                                    value={weekday[uctDate] || ""}
                                    readOnly />

                                <SelectionArea venueData={SampleVenueData.venues} getData={getDataArea} />
                                <SelectionRoom venueData={SampleVenueData.venues} selectedArea={areaSelected} getData={getDataRoomId} />     
                            </div>
                            <div>
                               <label htmlFor="start-time">Start time</label>
                               <input 
                                type="time"  
                                id="start-time" 
                                required
                                onChange={(e)=>{
                                    setFormData({...formData, start: e.target.value})
                                }}/>

                               <label htmlFor="end-time">End time</label>
                               <input 
                                type="time" 
                                id="end-time" 
                                required
                                onChange={(e)=>{
                                    setFormData({...formData, end: e.target.value})
                                }}/>
                            </div>
                        </div>

                        <button>Submit</button>           
                    </form>
                </div>
            )
}


const SampleVenueData = {
    venues: [
        {
        id: "31885e0e-823c-44ec-b857-b6b0bc4ee506",
        area: "NETC",
        room: "VIP"
        },
        {
         id: "31885e0e-833c-44ec-b857-b6b0bc4ee506",
         area: "NETC",
         room: "Semi-VIP"
        },
        {
        id: "31885e0e-833c-35ec-b857-b6b0bc4ee506",
        area: "NETC",
        room: "None Vip Pang Poor"
        },
        {
        id: "66c7ea44-ce2c-4679-89ee-491bd8b389d5",
        area: "GYM",
        room: "INTERNET LAB"
        },
        {
        id: "ee2e09c7-6356-4173-aaa8-24e9cbe48f99",
        area: "CCIS FACUTY",
        room: "M117"
        },
        {
        id: "ee2e09s7-6356-4173-aaa8-25e9cbe48f99",
        area: "COMPUTER LABORATORY",
        room: "CLB1"
        },
        {
        id: "ee3e39s7-6356-4173-aaa8-25e9cbe48f99",
        area: "COMPUTER LABORATORY",
        room: "CLB2"
        },
        {
        id: "ee3e39s7-6356-5473-aaa8-25e9cbe48f99",
        area: "COMPUTER LABORATORY",
        room: "CLB3"
        }
      ]
}