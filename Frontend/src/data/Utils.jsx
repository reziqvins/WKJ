export const getPaymentStatus = (PaymentStatus) => {
    if (PaymentStatus === "settlement")
      return (
        <div className="card rounded-md bg-green-400 text-center text-xs font-semibold w-16">
          Berhasil
        </div>
      );
    if (PaymentStatus === "pending")
      return (
        <div className="card rounded-md bg-yellow-400 text-center  text-xs font-semibold w-16">
          Pending
        </div>
      );
    else return <div className="badge badge-ghost">{PaymentStatus}</div>;
  };
  
  export const getStatus = (Status) => {
    if (Status === "delivered")
      return (
        <div className="card rounded-md bg-green-400 text-center text-xs font-semibold m-auto px-1">
          Delivered
        </div>
      );
    if (Status === "Arrange-Shipment")
      return (
        <div className="card rounded-md bg-blue-400 text-center text-xs font-semibold w-16">
          Sedang dalam pengiriman
        </div>
      );
    if (Status === "Package")
      return (
        <div className="card rounded-md bg-yellow-400 text-center text-xs font-semibold w-16">
          {Status}
        </div>
      );
  };
  
  export const getStatusResep = (Status) => {
    if (Status == true)
      return (
        <div className="card rounded-md p-1 bg-[#36c6d3] text-center text-xs font-semibold">
          Ya
        </div>
      );
    else {
      return (
        <div className="card rounded-md bg-red-400 text-center text-xs font-semibold">
          Tidak
        </div>
      );
    }
  };
  export const getStatusProducts = (Status) => {
    if (Status === "published")
      return (
        <div className="card rounded-md p-1 bg-[#36c6d3] text-center text-xs font-semibold">
          Published
        </div>
      );
    else {
      return (
        <div className="card rounded-md bg-red-400 text-center text-xs font-semibold">
          Pending
        </div>
      );
    }
  };
  
  function formatDate(datestring) {
    return new Date(datestring).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  
  export { formatDate };
  
  export const getPaymentMethod = (method) => {
    if (method === "bank_transfer")
      return <p className="text-[12px]">Bank Transfer</p>;
    if (method === "virtual_account")
      return <p className="text-[12px]">Virtual Account</p>;
    else return <p className="text-[12px]">{method}</p>;
  };
  