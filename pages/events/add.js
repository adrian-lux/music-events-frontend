import Layout from '@/components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/server';
import styles from '@/styles/Form.module.css';
import Link from 'next/link';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AddEventPage(){

const [values,setValues] = useState({
    name:'',
    performers:'',
    venue:'',
    address:'',
    date:'',
    time:'',
    description:'',
});

const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("submit");

        const hasEmptyFields = Object.values(values).some((value) => {
            return value == '';
        });

        if (hasEmptyFields) {
            toast.error("Please fill in all Fields");
        }
        else{
            const res = await fetch(`${API_URL}/api/events`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"data": values})
            });
    
            if (!res.ok) {
                toast.error("Sth went wrong.");
                console.log(res);
    
            } else {
                const data = await res.json;
            }
        }

        

    }

const handleInputChange = (e) => {
    const {name,value} = e.target
    values[e.target.id] = e.target.value;
    setValues({...values, [name]: value});
}

return <Layout title="Add an event">
    <Link href='/events'><a>Go Back</a></Link>
    <h1>Add Event here</h1>

    <ToastContainer/>
    <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
        <div>
            <label htmlFor='name'>Event Name</label>
            <input type="text" placeholder='Event Name' id='name' name='name' value={values.name} onChange={handleInputChange}/>
        </div>
        <div>
            <label htmlFor='performers'>Performers</label>
            <input type="text" placeholder='Performers' id='performers' name='performers' value={values.performers} onChange={handleInputChange}/>
        </div>

        <div>
            <label htmlFor='venue'>Venue</label>
            <input type="text" placeholder='Venue' id='venue' name='venue' value={values.venue} onChange={handleInputChange}/>
        </div>

        <div>
            <label htmlFor='address'>Address</label>
            <input type="text" placeholder='Address' id='address' name='address' value={values.address} onChange={handleInputChange}/>
        </div>
        <div>
            <label htmlFor='date'>Date</label>
            <input type="date" placeholder='Date' id='date' name='date' value={values.date} onChange={handleInputChange}/>
        </div>

        <div>
            <label htmlFor='time'>Start Time</label>    
            <input type="time" placeholder='Start Time' id='time' name='time' value={values.time} onChange={handleInputChange}/>
        </div>


        </div>
        <div>
        <label htmlFor='description'>Description</label>    
        <textarea type="text" placeholder='Description' id='description' name='description' value={values.description} onChange={handleInputChange}>

        </textarea>
        </div>

        <input type='submit' className='btn' value='Add Event'/>
        
    </form>
</Layout>

}