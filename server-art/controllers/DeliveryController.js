
const users = require('../Models/userSchema')
const deliverydetails = require('../Models/deliverydetailSchema')

//add delivery details
exports.addDeliveryDetails = async(req,res)=>{
    console.log('inside delivery details adding');

    try {
        const userId = req.payload;

        const user = await users.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        } else {
            
            const { fname, lastname, email, mobno, address, city, state,country, pincode, landmark } = req.body;

            console.log(`${fname}, ${lastname}, ${email}, ${mobno}, ${address}`);

            // Access username and role from the user object
            const newDetails = new deliverydetails({
                userId,
                fname,
                lastname,
                email,
                mobno,
                address,
                city,
                state,
                country,
                pincode,
                landmark,
            });

            await newDetails.save();
            
            res.status(200).json({ success: true, message: 'Delivery details added successfully', data: newDetails });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: `Failed due to error: ${err}` });
    }
}

//edit delivery details
exports.editDelivery = async(req,res)=>{
    console.log('inside update delivery details');
    const userId = req.payload

    const { fname, lastname, email, mobno, address, city, state,country, pincode, landmark } = req.body;


    try{
        const updateDeliveryDetails = await deliverydetails.findByIdAndUpdate({_id:userId},{ fname, lastname, email, mobno, address, city, state,country, pincode, landmark},{new:true})

        await updateDeliveryDetails.save()
        res.status(200).json(updateDeliveryDetails)
    } catch (err){
        res.status(401).json(err)
    }
}

//get one delivery details
exports.getUserDeliveryDetails = async(req,res)=>{
    console.log('get user delivery details');
    let userId = req.payload
  try{
    const oneDetails = await deliverydetails.find({userId})
    res.status(200).json(oneDetails)
  } catch(err){
    res.status(401).json(`Request failed due to ${err}`)
  }
    
}