import WorkerModel from '../DB_Models/WorkerModel.js'
import ServiceModel from '../DB_Models/ServiceModel.js'
import CommentModel from '../DB_Models/CommentModel.js'


//-------------------get current worker data------//

export const getCurrentWorkerData = async (req, res) => {
  const customerId = req.customerId;

  try {
    const worker = await WorkerModel.findOne({ customerId }).populate("customerId");
    if (!worker) {
      return res.json({ success: false, message: "no worker found" });
    }
    return res.json({ success: true, message: 'user Found', worker });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
//-------------add servises----------------//

export const addServices = async (req, res) => {
  const { serviceName, price, serviceLocation, serviceDescription, servicePhone, serviceSkill, workerId } = req.body;

  try {
    const newService = new ServiceModel({
      serviceName,
      price,
      serviceLocation,
      serviceDescription,
      servicePhone,
      serviceSkill,
      workerId,
    });

    await newService.save();

    return res.json({ success: true, message: "Service added successfully!", service: newService, });
  } catch (error) {
    return res.json({
      success: false, message: error.message,
    });
  }
};



//----------------get all services---------------//

export const getAllServices = async (req, res) => {
  try {
    const services = await ServiceModel.find().populate({
      path: "workerId",
      populate: {
        path: "customerId",
      },
    });
    res.json({ success: true, services, });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}


//---------------get each service details -----------------//

export const getServiceData = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const service = await ServiceModel.findById(serviceId).populate({
      path: "workerId",
      populate: {
        path: "customerId",
      },
    });

    if (!service) {
      return res.json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      service,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//---------------get all comment for each servise-----------------//

export const getAllComment = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const comments = await CommentModel.find({ serviceId })
      .populate("customerId");

    res.json({
      success: true,
      comments,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};