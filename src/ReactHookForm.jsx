import React from 'react';
import {useForm} from 'react-hook-form';
import {DevTool} from '@hookform/devtools';


const UserInfoValidationForm = ()=>{
    const form = useForm();
    const {register, control, handleSubmit, formState:{errors},reset,watch} = form;
    
    //console.log('form', form)
    const formSubmit = (data,e)=>{
        e.preventDefault()
        console.log('form submit', data);
        localStorage.setItem("name",data.name)
        localStorage.setItem("email",data.email)
        localStorage.setItem("phone",data.phone)
        document.getElementById("form1").style.display="none";
        document.getElementById("form2").style.display="block";
        reset();
        alert("Form Submitted Successfully")
       
    }
    return (
        <>
            <div className='userFrom' id='form1'>
                <h2>User Info Details</h2>
                <form action="#" onSubmit={handleSubmit(formSubmit)} className='userDetailForm' noValidate>
                    <div className='fromGroup'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" {...register('name', {
                            required:{
                                value:true,
                                message:'Please fill your good name'
                            },
                            validate:(fieldValue)=>{
                                return (fieldValue !== 'admin' && fieldValue!=='test') || 'Please enter another name'
                            }
                        })} placeholder='Enter your name' />
                        <p className='error'>{errors.name?.message}</p>
                    </div>
                    <div className='fromGroup'>
                        <label htmlFor="name">Email</label>
                        <input id="email"  type="email" {...register('email', {
                            pattern:{
                                value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message:"invalid email id please fill correct email id"
                            },
                            required:{
                                value:true,
                                message:'Please fill your email id'
                            },
                            validate:{
                                notAdminEmail:(value)=>{
                                    return value !== 'admin@admin.com' || 'Please choose another email id'
                                },
                                blockDomain:(value)=>{
                                    return (
                                        !value.endsWith('test.com') || "This domain is not allowd"
                                    )
                                },
                                lengthError: (value)=>{
                                    return value.length > 6 || 'Please write correct email formate'
                                }
                            }
                        })} placeholder='Enter your email' />
                        <p className='error'>{errors.email?.message}</p>
                    </div>
                    <div className='fromGroup'>
                        <label htmlFor='phone'>Mobile No.</label>
                        <input id="phone" type="number" {...register('phone', {
                            required:{
                                value:true,
                                message:'Please fill your mobile no'
                            },
                            validate:(value)=>{
                                return  value.length===10 || 'Mobile Number Should be of 10 digits only'
                            }
                        })} placeholder='Enter your number' />
                        <p className='error'>{errors.phone?.message}</p>
                    </div>
                    <div className='fromGroup'>
                        <input type="submit" value="Save" />
                    </div>

                </form>
                <DevTool control={control}/>
            </div>
            <div className="userForms" id="form2">
                <h1>Name:{localStorage.getItem("name")}</h1>
                <h1>Email:{localStorage.getItem("email")}</h1>
                <h1>Phone:{localStorage.getItem("phone")}</h1>
            </div>
        </>
    )
}


export default UserInfoValidationForm;