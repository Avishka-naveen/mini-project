export function completeWorkTemplate(customerName, workerName, serviceName, bookingDate) {
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
    <div style="
      background:linear-gradient(135deg,#059669,#10B981);
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
        ✅ Service Completed!
      </h1>

      <p style="
        color:rgba(255,255,255,0.9);
        font-size:15px;
        margin:6px 0 0 0;
      ">
        Your requested service has been successfully completed
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
        Hi <strong style="color:#1a202c;">
          ${customerName}
        </strong>,
      </p>


      <p style="
        color:#4a5568;
        font-size:15px;
        margin:0 0 24px 0;
      ">
        Great news! <strong>${workerName}</strong> has completed the
        <strong>${serviceName}</strong> service you requested.
        We hope you're satisfied with the service provided.
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
              background:#dcfce7;
              color:#166534;
              font-weight:600;
              font-size:13px;
              padding:4px 16px;
              border-radius:20px;
              margin-top:8px;
            ">
              ✅ Completed
            </span>

          </td>

        </tr>


      </table>


      <!-- Divider -->
      <hr style="
        border:0;
        border-top:2px dashed #e2e8f0;
        margin:20px 0;
      ">


      <!-- Rate Us Section -->
      <div style="
        background:#f0fdf4;
        border:1px solid #bbf7d0;
        border-radius:12px;
        padding:24px;
        margin-top:24px;
        text-align:center;
      ">

        <p style="
          font-size:20px;
          color:#166534;
          font-weight:700;
          margin:0 0 8px 0;
        ">
          ⭐ Rate Your Experience
        </p>


        <p style="
          color:#4a5568;
          font-size:14px;
          margin:0 0 18px 0;
          line-height:1.6;
        ">
          How was your experience with
          <strong>${workerName}</strong>?
          <br>
          Your rating helps us improve our service and helps other
          customers choose the right worker.
        </p>


        <!-- Rate Us Button -->
        <a
        
          style="
            display:inline-block;
            background:linear-gradient(135deg,#059669,#10B981);
            color:#ffffff;
            text-decoration:none;
            font-size:15px;
            font-weight:700;
            padding:12px 30px;
            border-radius:8px;
            box-shadow:0 4px 12px rgba(16,185,129,0.25);
          "
        >
          ⭐ Rate Us
        </a>


        <p style="
          color:#94a3b8;
          font-size:12px;
          margin:14px 0 0 0;
        ">
          It only takes a few seconds. Thank you for your feedback!
        </p>

      </div>


      <!-- What's Next -->
      <div style="
        margin-top:24px;
      ">

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
            Review the completed service
          </li>

          <li>
            Complete the payment if it is still pending
          </li>

          <li>
            Rate your experience with the worker
          </li>

          <li>
            Your feedback helps us improve Quick Hire
          </li>

        </ul>

      </div>


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