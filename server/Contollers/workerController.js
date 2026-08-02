import WorkerModel from '../DB_Models/WorkerModel.js'
import ServiceModel from '../DB_Models/ServiceModel.js'
import CommentModel from '../DB_Models/CommentModel.js'
import ReservationModel from '../DB_Models/ReservationModel.js'


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

//---------------get my reservations(worker)-----------------//

export const getMyReservations = async (req, res) => {
  const customerId = req.customerId;

  try {
    const worker = await WorkerModel.findOne({ customerId });
    const workerId = worker._id;
    const reservation = await ReservationModel.find({ workerId }).populate("customerId").populate("serviceId");
    res.json({
      success: true,
      reservation,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
}

//----------------get worker services------------//

export const getMyServices = async (req, res) => {

  const customerId = req.customerId;
  try {
    const worker = await WorkerModel.findOne({ customerId });
    if (!worker) {
      return res.json({ success: false, message: "No worker found" });
    }
    const workerId = worker._id;
    //console.log("workerID:",workerId)
    const services = await ServiceModel.find({ workerId });
    res.json({ success: true, services, });
  } catch (error) {
    res.json({
      success: false, message: error.message
    });
  }

}

//-----------------delete service-----------------//
export const deleteService = async (req, res) => {
  const { serviceId } = req.body;
  try {
    const deletedService = await ServiceModel.findByIdAndDelete(serviceId);
    if (!deletedService) {
      return res.json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

//-----------------------edit service------------------------//
export const editService = async (req, res) => {
  const { serviceId, serviceName, price, serviceLocation, serviceDescription, servicePhone, serviceSkill } = req.body;
  if (!serviceId || !serviceName || !price || !serviceLocation || !serviceDescription || !servicePhone || !serviceSkill) {
    return res.json({ success: false, message: "Missing Details!" });
  }
  try {
    const service = await ServiceModel.findById(serviceId);

    if (!service) {
      return res.json({ success: false, message: "Service not found", });
    }

    service.serviceName = serviceName;
    service.price = price;
    service.serviceLocation = serviceLocation;
    service.serviceDescription = serviceDescription;
    service.servicePhone = servicePhone;
    service.serviceSkill = serviceSkill;

    await service.save();

    return res.json({ success: true, message: "Service updated successfully!", service, });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}


//-----------------update worker profile-------------------//
export const updateWorkerProfile = async (req, res) => {

  const customerId = req.customerId;

  const { profile, address, description, nic } = req.body;

  try {

    const worker = await WorkerModel.findOneAndUpdate(
      { customerId },
      {
        profile,
        address,
        description,
        nic
      },
      { new: true }
    );

    if (!worker) {
      return res.json({ success: false, message: "No worker found" });
    }

    res.json({ success: true, message: "Worker profile updated successfully", worker });

  } catch (error) {

    res.json({ success: false, message: error.message });

  }
}