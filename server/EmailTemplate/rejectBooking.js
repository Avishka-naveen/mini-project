export function rejectBookingTemplate(customerName, workerName, serviceName, bookingDate) {
      const formattedBookingDate = new Date(bookingDate).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );
    return `
   <div style="margin:0; padding:40px 20px; box-sizing:border-box; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color:#f6f9fc; line-height:1.6;">

  <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08);">


    <!-- Header -->
    <div style="background:linear-gradient(135deg,#DC2626,#EF4444); padding:32px 40px; text-align:center;">

      <h1 style="color:#ffffff; font-size:26px; font-weight:700; margin:0; letter-spacing:-0.5px;">
        ❌ Booking Rejected
      </h1>

      <p style="color:rgba(255,255,255,0.9); font-size:15px; margin:6px 0 0 0;">
        Unfortunately, your booking request was rejected
      </p>

    </div>


    <!-- Body -->
    <div style="padding:36px 40px 28px 40px;">


      <!-- Greeting -->
      <p style="font-size:18px; color:#1a202c; margin:0 0 6px 0;">
        Hi <strong style="color:#1a202c;">${customerName}</strong>,
      </p>


      <p style="color:#4a5568; font-size:15px; margin:0 0 24px 0;">
        Unfortunately, <strong>${workerName}</strong> has rejected your
        booking request for the following service.
        Don't worry, you can try booking another available worker.
      </p>


      <!-- Divider -->
      <hr style="border:0; border-top:2px dashed #e2e8f0; margin:20px 0;">


      <!-- Booking Details -->
      <table style="width:100%; border-collapse:collapse; margin:16px 0 20px 0;">


        <!-- Service Name -->
        <tr>

          <td style="
            padding:10px 16px 10px 0;
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
            padding:10px 0;
            color:#1a202c;
            font-size:15px;
            font-weight:600;
            border-bottom:1px solid #f0f4f8;
          ">
            ${serviceName}
          </td>

        </tr>


        <!-- Worker -->
        <tr>

          <td style="
            padding:10px 16px 10px 0;
            color:#718096;
            font-size:13px;
            font-weight:600;
            text-transform:uppercase;
            letter-spacing:0.5px;
            width:35%;
            border-bottom:1px solid #f0f4f8;
          ">
            Worker
          </td>

          <td style="
            padding:10px 0;
            color:#1a202c;
            font-size:15px;
            font-weight:600;
            border-bottom:1px solid #f0f4f8;
          ">
            ${workerName}
          </td>

        </tr>


        <!-- Booking Date -->
        <tr>

          <td style="
            padding:10px 16px 10px 0;
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
            padding:10px 0;
            color:#1a202c;
            font-size:15px;
            font-weight:600;
            border-bottom:1px solid #f0f4f8;
          ">
             ${formattedBookingDate}
          </td>

        </tr>


        <!-- Status -->
        <tr>

          <td style="
            padding:10px 16px 10px 0;
            color:#718096;
            font-size:13px;
            font-weight:600;
            text-transform:uppercase;
            letter-spacing:0.5px;
            width:35%;
          ">
            Status
          </td>


          <td style="
            padding:10px 0;
            color:#1a202c;
            font-size:15px;
            font-weight:600;
          ">

            <span style="
              display:inline-block;
              background:#fee2e2;
              color:#991b1b;
              font-weight:600;
              font-size:13px;
              padding:4px 16px;
              border-radius:20px;
              margin-top:8px;
            ">
              ❌ Rejected
            </span>

          </td>

        </tr>


      </table>


      <!-- Divider -->
      <hr style="border:0; border-top:2px dashed #e2e8f0; margin:20px 0;">


      <!-- What's Next -->
      <p style="
        font-size:15px;
        color:#1a202c;
        margin:0 0 4px 0;
      ">
        <strong>📌 What's next?</strong>
      </p>


      <ul style="
        color:#4a5568;
        font-size:14px;
        padding-left:20px;
        margin:8px 0 0 0;
        line-height:1.8;
      ">

        <li>
          You can search for another available worker
        </li>

        <li>
          You can submit a new booking request
        </li>

        <li>
          Check other workers offering the same service
        </li>

        <li>
          Contact Quick Hire support if you need assistance
        </li>

      </ul>


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

</div>


    `
}