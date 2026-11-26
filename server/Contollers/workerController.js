import WorkerModel from '../DB_Models/WorkerModel.js'
import ServiceModel from '../DB_Models/ServiceModel.js'
import CommentModel from '../DB_Models/CommentModel.js'
import ReservationModel from '../DB_Models/ReservationModel.js'
import NotificationModel from '../DB_Models/NotificationModel.js'
import transporter from '../config/nodeMail.js'
import { acceptBookingTemplate } from '../EmailTemplate/acceptBooking.js'
import { rejectBookingTemplate } from '../EmailTemplate/rejectBooking.js'
import { completeWorkTemplate } from '../EmailTemplate/completedWork.js'
import ReportModel from '../DB_Models/ReportModel.js'


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
  const { customerId } = req.body;
  // console.log(customerId)

  try {
    const services = await ServiceModel.find().populate({
      path: "workerId",
      populate: {
        path: "customerId",
      },
    });

    const filteredServices = customerId
      ? services.filter((service) => {
        const serviceCustomerId = service.workerId?.customerId?._id
          ? service.workerId.customerId._id.toString()
          : service.workerId?.customerId?.toString();

        return serviceCustomerId !== customerId.toString();
      })
      : services;

    res.json({ success: true, services: filteredServices });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


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


    await CommentModel.deleteMany({ serviceId });
    await ReservationModel.deleteMany({ serviceId });

    return res.json({ success: true, message: "Service deleted successfully" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

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


// -------------------- Accept Customer Booking -------------------- //

export const acceptUserBooking = async (req, res) => {
  const { reservationId } = req.body;

  if (!reservationId) {
    return res.json({ success: false, message: "Missing reservation ID" });
  }

  try {

    const reservation = await ReservationModel.findById(reservationId)
      .populate({
        path: "workerId",
        populate: {
          path: "customerId",
          model: "Customer"
        }
      })
      .populate("serviceId")
      .populate("customerId");

    if (!reservation) {
      return res.json({ success: false, message: "Reservation not found!" });
    }


    if (!reservation.workerId || !reservation.workerId.customerId) {
      return res.json({
        success: false, message: "Worker or worker customer details not found!"
      });
    }

    if (!reservation.customerId || !reservation.serviceId) {
      return res.json({ success: false, message: "Customer or service details not found!" });
    }


    reservation.status = "confirmed";
    await reservation.save();


    const notification = new NotificationModel({
      recipient: reservation.customerId._id,
      sender: reservation.workerId.customerId._id,
      senderRole: "worker",
      recipientRole: "customer",
      type: "reservation",
      message: `Your booking for ${reservation.serviceId.serviceName} has been confirmed by ${reservation.workerId.customerId.customerName}.`,
      relatedId: reservation._id
    });

    const savedNotification = await notification.save();

    return res.json({ success: true, message: "Booking confirmed successfully!", reservation, notification: savedNotification });

    console.log("Notification saved:", savedNotification._id);

    const emailTemplate = acceptBookingTemplate(
      reservation.customerName,
      reservation.workerId.customerId.customerName,
      reservation.serviceId.serviceName,
      reservation.date
    );

    await transporter.sendMail({
      from: "Quick Hire Support",
      to: reservation.customerEmail,
      subject: "Booking Accepted!",
      html: emailTemplate
    });




  } catch (error) {
    console.error("Accept booking error:", error);

    return res.json({ success: false, message: error.message });
  }
};


//---------------------------delete customer booking---------------------//


export const deleteUserBooking = async (req, res) => {
  const { reservationId } = req.body;
  if (!reservationId) {
    return res.json({ success: false, message: "missing details" });
  }

  try {
    const reservation = await ReservationModel.findById(reservationId).populate({
      path: 'workerId',
      populate: {
        path: 'customerId'
      }
    }).populate('serviceId');
    if (!reservation) {
      return res.json({ success: false, message: "reservation not found!" });
    }
    reservation.status = 'rejected';
    await reservation.save();
    const notification = new NotificationModel({
      recipient: reservation.customerId._id,
      sender: reservation.workerId.customerId._id,
      senderRole: "worker",
      recipientRole: "customer",
      type: "reservation",
      message: `Your booking for ${reservation.serviceId.serviceName} has been rejected by ${reservation.workerId.customerId.customerName}.`,
      relatedId: reservation._id
    });

    const savedNotification = await notification.save();
    res.json({ success: true, message: "Booking  rejected succesfully!", reservation });

    // call email template 
    const emailTemplate = rejectBookingTemplate(reservation.customerName, reservation.workerId.customerId.customerName, reservation.serviceId.serviceName, reservation.date);

    //send mail
    await transporter.sendMail({
      from: "Quick Hire Support",
      to: reservation.customerEmail,
      subject: 'Booking Reject!',
      html: emailTemplate

    });



  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
//---------------------------complete customer booking---------------------//


export const completeUserBooking = async (req, res) => {
  const { reservationId } = req.body;
  if (!reservationId) {
    return res.json({ success: false, message: "missing details" });
  }

  try {
    const reservation = await ReservationModel.findById(reservationId).populate({
      path: 'workerId',
      populate: {
        path: 'customerId'
      }
    }).populate('serviceId');;;
    if (!reservation) {
      return res.json({ success: false, message: "reservation not found!" });
    }
    reservation.status = 'completed';
    await reservation.save();

    const notification = new NotificationModel({
      recipient: reservation.customerId._id,
      sender: reservation.workerId.customerId._id,
      senderRole: "worker",
      recipientRole: "customer",
      type: "reservation",
      message: `Congratulations! Your booking for ${reservation.serviceId.serviceName} has been successfully completed by ${reservation.workerId.customerId.customerName}. Please take a moment to rate the worker.`,
      relatedId: reservation._id
    });

    const savedNotification = await notification.save();
    res.json({ success: true, message: "Booking  completed succesfully!", reservation });

    // call email template 
    const emailTemplate = completeWorkTemplate(reservation.customerName, reservation.workerId.customerId.customerName, reservation.serviceId.serviceName, reservation.date);

    //send mail
    await transporter.sendMail({
      from: "Quick Hire Support",
      to: reservation.customerEmail,
      subject: 'Work Done!',
      html: emailTemplate

    });


  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

//---------------------------get worker comments---------------------//
export const getWorkerComments = async (req, res) => {
  const customerId = req.customerId;
  try {
    const worker = await WorkerModel.findOne({ customerId });
    if (!worker) {
      return res.json({ success: false, message: "no worker found" });
    }

    const services = await ServiceModel.find({ workerId: worker._id });
    const serviceIds = services.map((service) => service._id);

    const comments = await CommentModel.find({ serviceId: { $in: serviceIds } })
      .populate("customerId")
      .populate("serviceId");

    res.json({ success: true, services, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//---------------------------reply to comment---------------------//
export const replyToComment = async (req, res) => {
  const { commentId, reply } = req.body;

  if (!commentId || !reply) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      return res.json({ success: false, message: "Comment not found" });
    }
    comment.reply = reply;
    await comment.save();
    res.json({ success: true, message: "Reply added successfully", comment });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

