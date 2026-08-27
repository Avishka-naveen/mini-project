export function workerReservationTemplate(workerName,serviceName,customerName,bookingDate,customerAddress){
      const formattedBookingDate = new Date(bookingDate).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

return  `<div style="
  margin:0;
  padding:40px 20px;
  box-sizing:border-box;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color:#f6f9fc;
  line-height:1.6;
">

  <div style="
    max-width:600px;
    margin:0 auto;
    background:#ffffff;
    border-radius:16px;
    overflow:hidden;
    box-shadow:0 4px 24px rgba(0,0,0,0.08);
  ">

    <!-- Header -->
    <div style="
      background:linear-gradient(135deg,#2563EB,#7C3AED);
      padding:32px 40px;
      text-align:center;
    ">

      <h1 style="
        color:#ffffff;
        font-size:26px;
        font-weight:700;
        margin:0;
        letter-spacing:-0.5px;
      ">
        📅 New Booking Received!
      </h1>

      <p style="
        color:rgba(255,255,255,0.9);
        font-size:15px;
        margin:6px 0 0 0;
      ">
        A customer has booked your service
      </p>

    </div>


    <!-- Body -->
    <div style="padding:36px 40px 28px 40px;">

      <!-- Greeting -->
      <p style="
        font-size:18px;
        color:#1a202c;
        margin:0 0 6px 0;
      ">
        Hi <strong style="color:#1a202c;">${workerName}</strong>,
      </p>


      <p style="
        color:#4a5568;
        font-size:15px;
        margin:0 0 24px 0;
      ">
        Great news! You have received a new booking request from
        <strong>${customerName}</strong>.
        Please review the booking details below.
      </p>


      <!-- Divider -->
      <hr style="
        border:0;
        border-top:2px dashed #e2e8f0;
        margin:20px 0;
      ">


      <!-- Booking Details -->
      <table style="
        width:100%;
        border-collapse:collapse;
        margin:16px 0 20px 0;
      ">

        <!-- Service Name -->
        <tr>

          <td style="
            padding:12px 16px 12px 0;
            color:#718096;
            font-size:13px;
            font-weight:600;
            text-transform:uppercase;
            letter-spacing:0.5px;
            width:35%;
            border-bottom:1px solid #f0f4f8;
          ">
            Service Name
          </td>

          <td style="
            padding:12px 0;
            color:#1a202c;
            font-size:15px;
            font-weight:600;
            border-bottom:1px solid #f0f4f8;
          ">
            ${serviceName}
          </td>

        </tr>


        <!-- Customer Name -->
        <tr>

          <td style="
            padding:12px 16px 12px 0;
            color:#718096;
            font-size:13px;
            font-weight:600;
            text-transform:uppercase;
            letter-spacing:0.5px;
            width:35%;
            border-bottom:1px solid #f0f4f8;
          ">
            Customer
          </td>

          <td style="
            padding:12px 0;
            color:#1a202c;
            font-size:15px;
            font-weight:600;
            border-bottom:1px solid #f0f4f8;
          ">
            ${customerName}
          </td>

        </tr>


        <!-- Booking Date -->
        <tr>

          <td style="
            padding:12px 16px 12px 0;
            color:#718096;
            font-size:13px;
            font-weight:600;
            text-transform:uppercase;
            letter-spacing:0.5px;
            width:35%;
            border-bottom:1px solid #f0f4f8;
          ">
            Booking Date
          </td>

          <td style="
            padding:12px 0;
            color:#1a202c;
            font-size:15px;
            font-weight:600;
            border-bottom:1px solid #f0f4f8;
          ">
            📅 ${formattedBookingDate}
          </td>

        </tr>


        <!-- Address -->
        <tr>

          <td style="
            padding:12px 16px 12px 0;
            color:#718096;
            font-size:13px;
            font-weight:600;
            text-transform:uppercase;
            letter-spacing:0.5px;
            width:35%;
          ">
            Address
          </td>

          <td style="
            padding:12px 0;
            color:#1a202c;
            font-size:15px;
            font-weight:600;
          ">
            📍 ${customerAddress}
          </td>

        </tr>

      </table>


      <!-- Information Box -->
      <div style="
        background:#eff6ff;
        border:1px solid #bfdbfe;
        border-radius:12px;
        padding:20px;
        margin-top:24px;
      ">

        <p style="
          color:#1e40af;
          font-size:15px;
          font-weight:700;
          margin:0 0 8px 0;
        ">
          📌 Please check the system
        </p>

        <p style="
          color:#4a5568;
          font-size:14px;
          margin:0;
          line-height:1.7;
        ">
          Please log in to the Quick Hire system to view more information
          about this booking, including the customer's complete details
          and other booking information.
        </p>

      </div>


      <!-- Action Button -->
      <div style="
        text-align:center;
        margin:26px 0 8px 0;
      ">

        <a
          
          style="
            display:inline-block;
            background:linear-gradient(135deg,#2563EB,#7C3AED);
            color:#ffffff;
            text-decoration:none;
            font-size:15px;
            font-weight:700;
            padding:12px 28px;
            border-radius:8px;
            box-shadow:0 4px 12px rgba(37,99,235,0.25);
          "
        >
          🔍 Check Booking
        </a>

      </div>


      <p style="
        color:#94a3b8;
        font-size:12px;
        text-align:center;
        margin:12px 0 0 0;
      ">
        Please review the booking and respond through the Quick Hire system.
      </p>

    </div>


    <!-- Footer -->
    <div style="
      background:#f7fafc;
      padding:20px 40px;
      text-align:center;
      border-top:1px solid #e2e8f0;
    ">

      <p style="
        color:#a0aec0;
        font-size:13px;
        margin:4px 0;
      ">
        &copy; 2026 <strong>Quick Hire</strong>. All rights reserved.
      </p>


      <p style="
        font-size:12px;
        color:#cbd5e0;
        margin:6px 0 0 0;
      ">
        Need help?

        <a
          href="mailto:support@quickhire.com"
          style="
            color:#2563EB;
            text-decoration:none;
          "
        >
          support@quickhire.com
        </a>

      </p>

    </div>


  </div>

</div>`}