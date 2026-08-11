import CustomerModel from '../DB_Models/CustomerModel.js'
import WorkerModel from '../DB_Models/WorkerModel.js'
import ReservationModel from '../DB_Models/ReservationModel.js'
import ServiceModel from '../DB_Models/ServiceModel.js'
import CommentModel from '../DB_Models/CommentModel.js'




//-------------------get all users data-----------------------//
export const getAllUsersData = async (req, res) => {
    try {
        const users = await CustomerModel.find();

        if (users.length === 0) {
            return res.json({ success: false, message: "No users found!" });
        }

        return res.json({ success: true, message: "Users fetched successfully!", users });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


//-----------------delete selected customer account------------//



export const deleteCustomer = async (req, res) => {
    const { customerId } = req.body;

    if (!customerId) {
        return res.json({
            success: false,
            message: "Customer ID is required!",
        });
    }

    try {
        const customer = await CustomerModel.findById(customerId);

        if (!customer) {
            return res.json({
                success: false,
                message: "User not found!",
            });
        }

        // Delete comments made by this customer
        await CommentModel.deleteMany({ customerId });

        if (customer.role === "worker") {

            const worker = await WorkerModel.findOne({ customerId });

            if (worker) {
                const workerId = worker._id;

                // Find worker's services
                const services = await ServiceModel.find({ workerId });

                const serviceIds = services.map(
                    (service) => service._id
                );

                // Delete comments related to worker's services
                await CommentModel.deleteMany({
                    serviceId: { $in: serviceIds },
                });

                // Delete reservations
                await ReservationModel.deleteMany({ workerId });

                // Delete services
                await ServiceModel.deleteMany({ workerId });

                // Delete worker
                await WorkerModel.findByIdAndDelete(workerId);
            }

        } else {
            // Customer role

            // Delete customer's reservations
            await ReservationModel.deleteMany({ customerId });
        }

        // Finally delete customer account
        await CustomerModel.findByIdAndDelete(customerId);

        return res.json({
            success: true,
            message: "User deleted successfully!",
            customer,
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

//-----------------fetch all workers---------------------//

export const getAllWorkers = async (req, res) => {
    try {
        const workers = await WorkerModel.find().populate("customerId");
        if (workers.length === 0) {
            return res.json({ success: false, message: "No workers found!" });

        }
        return res.json({ success: true, message: "Worker fetched successfully!", workers });
    } catch (error) {
        return res.json({ success: false, message: error.message, });
    }
}

//--------------------delete select worker--------------------//

export const deleteWorker = async (req, res) => {
    const { workerId } = req.body;

    try {
        const worker = await WorkerModel.findById(workerId);

        if (!worker) {
            return res.json({ success: false, message: "Worker not found!" });
        }


        const customer = await CustomerModel.findById(worker.customerId);

        if (customer) {
            customer.role = "customer";
            await customer.save();
        }


        const services = await ServiceModel.find({ workerId });

        const serviceIds = services.map(service => service._id);


        await CommentModel.deleteMany({
            serviceId: { $in: serviceIds }
        });

        await ReservationModel.deleteMany({ workerId });
        await ServiceModel.deleteMany({ workerId });
        await WorkerModel.findByIdAndDelete(workerId);

        return res.json({
            success: true, message: "Worker deleted successfully!"
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//----------------worker profile disable-----------------//

export const disableWorker = async (req, res) => {
    const { workerId } = req.body;

    if (!workerId) {
        return res.json({ success: false, message: "Missing details!" });
    }

    try {
        const worker = await WorkerModel.findById(workerId);

        if (!worker) {
            return res.json({ success: false, message: "Worker not found!" });
        }

        worker.isActive = false;
        await worker.save();

        return res.json({ success: true, message: "Worker account disabled successfully!", worker });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
//----------------worker profile enable-----------------//

export const enableWorker = async (req, res) => {
    const { workerId } = req.body;

    if (!workerId) {
        return res.json({ success: false, message: "Missing details!" });
    }

    try {
        const worker = await WorkerModel.findById(workerId);

        if (!worker) {
            return res.json({ success: false, message: "Worker not found!" });
        }

        worker.isActive = true;
        await worker.save();

        return res.json({ success: true, message: "Worker account enable successfully!", worker });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//-----------------------get all reservations-----------------------//



export const getAllReservations = async (req, res) => {
    try {
        const reservations = await ReservationModel.find().populate({
            path: "workerId",
            populate: {
                path: "customerId"
            }
        })
            .populate("serviceId");

        if (reservations.length === 0) {
            return res.json({ success: false, message: "Reservations not found!" });
        }

        return res.json({ success: true, message: "Reservations get successfully!", reservations });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//------------------------delete reservation---------------//

export const deleteReservation = async (req, res) => {
    const { reservationId } = req.body;
    if (!reservationId) {
        return res.json({ success: false, message: "missing details!" });
    }
    try {


        const reservation = await ReservationModel.findByIdAndDelete(reservationId);

        if (!reservation) {
            return res.json({ success: false, message: "Reservation not found!" });
        }

        return res.json({ success: true, message: "Reservation deleted successfully!" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//------------------get all services--------------------------//


export const getAllServices = async (req, res) => {
    try {
        const services = await ServiceModel.find().populate({
            path: "workerId",
            populate: {
                path: "customerId"
            }
        });
        if (services.length === 0) {
            return res.json({ success: false, message: "services not found!" });

        }
        return res.json({ success: true, message: "servises get successfully!", services });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//------------------get all comment for each services----------------//

export const getAllComment = async (req, res) => {
    const { serviceId } = req.body;
    if (!serviceId) {
        return res.json({ success: false, message: "missing details!" });
    }

    try {
        const comments = await CommentModel.find({ serviceId }).populate('customerId');

        if (comments.length === 0) {
            return res.json({ success: false, message: "Comments not found!" });
        }

        return res.json({ success: true, message: "Comments get successfully!", comments });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//------------------delete service-----------------//

export const deleteService = async (req, res) => {
    const { serviceId } = req.body;
    if (!serviceId) {
        return res.json({ success: false, message: "missing details!" });
    }
    try {
        const service = await ServiceModel.findByIdAndDelete(serviceId);

        if (!service) {
            return res.json({ success: false, message: "service not found!" });
        }
        return res.json({ success: true, message: "service deleted successfully!", service });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }

}