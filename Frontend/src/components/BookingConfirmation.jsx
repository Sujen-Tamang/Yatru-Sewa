const BookingConfirmation = ({
                               bookingId,
                               passenger,
                               bus,
                               seat,
                               date,
                               departure,
                               price,
                               paymentMethod,
                               from,
                               to,
                               qrCodeUrl,
                               onPrint,
                               onDownload,
                               onBookAnother
                             }) => {
  return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-2xl">
        {/* Header */}
        <div className="bg-green-600 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
          <p className="mt-2">Your ticket has been successfully booked</p>
        </div>

        {/* Ticket Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Booking ID:</span>
                  <span className="font-medium">{bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Passenger:</span>
                  <span className="font-medium">{passenger}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bus:</span>
                  <span className="font-medium">{bus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Seat(s):</span>
                  <span className="font-medium">{seat}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-3">Journey Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium">{date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Departure:</span>
                    <span className="font-medium">{departure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Route:</span>
                    <span className="font-medium">{from} → {to}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - QR Code */}
            <div className="flex flex-col items-center justify-center border-l md:pl-6">
              <img
                  src={qrCodeUrl}
                  alt="Booking QR Code"
                  className="w-32 h-32 mb-4"
              />
              <p className="text-sm text-gray-500 mb-2">Scan this QR code at boarding</p>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-3">Payment Summary</h3>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Amount:</span>
              <span className="font-bold text-lg">{price}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-gray-500">Payment Method:</span>
              <span className="font-medium">{paymentMethod}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <button
                onClick={onPrint}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Print Ticket
            </button>
            <button
                onClick={onDownload}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
            >
              Download Ticket
            </button>
            <button
                onClick={onBookAnother}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md"
            >
              Book Another Bus
            </button>
          </div>
        </div>
      </div>
  );
};

export default BookingConfirmation;