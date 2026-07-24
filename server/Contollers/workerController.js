import WorkerModel from '../DB_Models/WorkerModel.js'

export const getCurrentWorkerData=async(req,res)=>{
     const customerId = req.customerId;

     try {
        const worker = await WorkerModel.findOne({ customerId }).populate("customerId");
        if(!worker){
              return res.json({ success: false, message: "no worker found" });
        }
         return res.json({ success: true, message: 'user Found', worker });
     } catch (error) {
       return res.json({ success: false, message: error.message });
     }
}