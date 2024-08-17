"use client";

import React, { useEffect, useState } from "react";
import { AdminRoutes } from "../../routers/routes.jsx";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "../../components/admin-page/Sidebar";

function page() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; //!Colocar una animacion mientras se espera que se renderice en el cliente
  }

  return (
    <>
      <BrowserRouter>
        <main
          className={`grid ${
            sidebarOpen ? "grid-cols-[300px_auto]" : "grid-cols-[90px_auto]"
          } `}>
          <section>
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </section>
          <section>
            <AdminRoutes />
          </section>
        </main>
      </BrowserRouter>
    </>
  );
}

export default page;
