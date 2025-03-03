import { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

function Home() {
  const [users, setUsers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showAddresses, setShowAddresses] = useState(null); // Estado para controlar qué direcciones mostrar

  useEffect(() => {
    fetchUsers();
    fetchSuggestedUsers();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchUsers = () => {
    setLoading(true);
    axios.get("http://localhost:5000/api/users")
      .then(response => {
        const formattedUsers = response.data.map(user => ({
          id: user.ID,
          nombre: user.NOMBRE,
          correo: user.CORREO,
          pais: user.PAIS,
          foto: user.FOTO
        }));
        setUsers(formattedUsers || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener usuarios:", error);
        setError("No se pudieron cargar los usuarios.");
        setLoading(false);
      });
  };

  const fetchAddresses = (id) => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/users/${id}/addresses`)
      .then(response => {
        console.log('Direcciones recibidas:', response.data);
        setAddresses(response.data || []);
        setShowAddresses(id); 
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener direcciones:", error);
        setLoading(false);
      });
  };

  const fetchSuggestedUsers = () => {
    axios.get("https://randomuser.me/api/?results=5")
      .then(response => setSuggestedUsers(response.data.results))
      .catch(error => console.error("Error al obtener usuarios sugeridos:", error));
  };

  const addUser = (user) => {
    axios.post("http://localhost:5000/api/users/add", user)
      .then(response => {
        showNotification("Usuario agregado correctamente", "success");
        fetchUsers(); // Actualizar lista de usuarios después de agregar
      })
      .catch(error => {
        console.error("Error al agregar usuario:", error);
        showNotification("Error al agregar usuario", "error");
      });
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(() => {
        showNotification("Usuario eliminado correctamente", "success");
        fetchUsers();
      })
      .catch(error => {
        console.error("Error al eliminar usuario:", error);
        showNotification("Error al eliminar usuario", "error");
      });
  };

  return (
    <div className="container">
      {notification && (
        <div className={`notification ${notification.type}`}>{notification.message}</div>
      )}
      <div className="users-section">
        <h1>Lista de Usuarios</h1>
        <input
          type="text"
          placeholder="Buscar usuario..."
          className="search-box"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        {loading ? (
          <p>Cargando usuarios...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="user-list">
            {users.filter(user => user.nombre?.toLowerCase().includes(search)).map((user) => (
              <div key={user.id} className="user-card">
                <img src={user.foto || "https://via.placeholder.com/50"} alt={user.nombre || "Usuario"} />
                <p>{user.nombre || "Desconocido"}</p>
                <p>{user.correo || "Sin correo"}</p>
                <p>{user.pais || "Sin país"}</p>
                <button onClick={() => fetchAddresses(user.id)}>Ver Direcciones</button>
                <button className="delete" onClick={() => deleteUser(user.id)}>Eliminar</button>

                {showAddresses === user.id && (
                  <div className="addresses-list">
                    <h3>Direcciones:</h3>
                    {loading ? (
                      <p>Cargando direcciones...</p>
                    ) : addresses.length > 0 ? (
                      addresses.map((address, index) => (
                        <div key={index} className="address-card">
                          <p><strong>Calle:</strong> {address.calle}</p> 
                          <p><strong>Ciudad:</strong> {address.ciudad}</p>
                          <p><strong>Estado:</strong> {address.estado}</p>
                          <p><strong>Código Postal:</strong> {address.codigo_postal}</p>
                        </div>
                      ))
                    ) : (
                      <p>No hay direcciones disponibles.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="add-user-section">
        <h2>Agregar Usuarios</h2>
        <button onClick={fetchSuggestedUsers}>Generar Nuevos Usuarios</button>
        <div className="suggested-users">
          {suggestedUsers.map((user, index) => (
            <div key={index} className="user-card">
              <img src={user.picture.medium} alt={user.name.first} />
              <p>{user.name.first} {user.name.last}</p>
              <p>{user.email}</p>
              <p>{user.location.country}</p>
              <button className="add" onClick={() => addUser({
                id: index,
                nombre: `${user.name.first} ${user.name.last}`,
                correo: user.email,
                pais: user.location.country,
                foto: user.picture.medium
              })}>
                Agregar Usuario
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
