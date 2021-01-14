/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.daw.login;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.annotation.Resource;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

/**
 *
 * @author manueltejadaguzman
 */
@WebServlet(name = "Leer", urlPatterns = {"/Leer"})
public class Leer extends HttpServlet {

    @Resource(name = "connectionPool")
    private DataSource connectionPool;

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        //guarda el mensaje sobre el resultado
        String msg;

        //creo el usuario
        Usuario user;

        //creamos las variables para la conexión, la sentecia y el resultado y asignar sus campos con los valores leidos
        Connection conn;
        PreparedStatement ps;
        ResultSet filasAfectadas;

        try {
            // Leer los parámetros enviados desde el formulario
            String correo = request.getParameter("email");
            String contrasenia = request.getParameter("pass");

            user = new Usuario();
            user.setCorreo(correo);
            user.setContasenia(contrasenia);

            // establecer la conexión
            Context c = new InitialContext();
            connectionPool = (DataSource) c.lookup("jdbc/myDatasource");
            conn = connectionPool.getConnection();

            // Preparar la sentencia SQL a realizar
            ps = conn.prepareStatement("SELECT * FROM Usuarios where nombre=? and password=?");
            ps.setString(1, user.getCorreo());
            ps.setString(2, user.getContasenia());

            // Ejecutar instrucción SQL y guardar resultado en msg
            filasAfectadas = ps.executeQuery();
            if (filasAfectadas.first()) {
                msg = "<p>OK: Sentencia select realizada correctamente</p>";
            } else {
                msg = "<p>ERROR: Ha fallado la busqueda</p>";
            }

            ps.close();
            conn.close();
        } catch (NamingException ex) {
            msg = "<p>ERROR: Recurso no disponible</p>";
            System.out.println(ex);
        } catch (SQLException ex) {
            msg = "<p>ERROR: Base de Datos no disponible</p>";
            System.out.println(ex);
        } catch (NumberFormatException ex) {
            msg = "<p>ERROR: Parámetros no Válidos</p>";
            System.out.println(ex);
        }
        
        // Implementar la respuesta HTML
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>App Web Práctica 5.a)</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>DAW - Práctica 5.a) Servlets y Acceso a Datos mediante un Pool de conexiones</h1>");
            out.println("<h2>Estado de la inserción</h2>");
            out.println(msg);
            out.println("<p><a href=\"index.html\">Volver</a>");
            out.println("</body>");
            out.println("</html>");
        }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
