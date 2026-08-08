import CustomerModel from '../DB_Models/CustomerModel.js'
import WorkerModel from '../DB_Models/WorkerModel.js'
import ReservationModel from '../DB_Models/ReservationModel.js'




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
        return res.json({ success: false, message: "Customer ID is required!", });
    }

    try {
        const customer = await CustomerModel.findByIdAndDelete(customerId);

        if (!customer) {
            return res.json({ success: false, message: "User not found!", });
        }

        return res.json({ success: true, message: "User deleted successfully!", customer, });
    } catch (error) {
        return res.json({ success: false, message: error.message, });
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
            return res.json({success: false,message: "Worker not found!"});
        }

        const customer = await CustomerModel.findById(worker.customerId);

        if (customer) {
            customer.role = "customer";
            await customer.save();                      //still have to upxdate worker and user
        }

        await WorkerModel.findByIdAndDelete(workerId);

        return res.json({success: true,message: "Worker deleted successfully!"});

    } catch (error) {
        return res.json({success: false,message: error.message});
    }
};

//----------------worker profile disable-----------------//

export const disableWorker = async (req, res) => {
    const { workerId } = req.body;

    if (!workerId) {
        return res.json({success: false,message: "Missing details!"});
    }

    try {
        const worker = await WorkerModel.findById(workerId);

        if (!worker) {
            return res.json({success: false,message: "Worker not found!"});
        }

        worker.isActive = false;
        await worker.save();

        return res.json({success: true,message: "Worker account disabled successfully!",worker});

    } catch (error) {
        return res.json({success: false,message: error.message});
    }
};
//----------------worker profile enable-----------------//

export const enableWorker = async (req, res) => {
    const { workerId } = req.body;

    if (!workerId) {
        return res.json({success: false,message: "Missing details!"});
    }

    try {
        const worker = await WorkerModel.findById(workerId);

        if (!worker) {
            return res.json({success: false,message: "Worker not found!"});
        }

        worker.isActive = true;
        await worker.save();

        return res.json({success: true,message: "Worker account enable successfully!",worker});

    } catch (error) {
        return res.json({success: false,message: error.message});
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
            return res.json({success: false,message: "Reservations not found!"});
        }

        return res.json({success: true,message: "Reservations get successfully!",reservations});

    } catch (error) {
        return res.json({success: false,message: error.message });
    }
};