package com.reborn.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.reborn.backend.dto.inbound.ConnectionRequest;
import com.reborn.backend.model.Connection;
import com.reborn.backend.model.User;
import com.reborn.backend.repository.ConnectionRepository;
import com.reborn.backend.repository.UserRepository;

@Service
public class ConnectionService {
    private final ConnectionRepository connectionRepository;
    private final UserRepository userRepository;

    public ConnectionService(ConnectionRepository connectionRepository, UserRepository userRepository) {
        this.connectionRepository = connectionRepository;
        this.userRepository = userRepository;
    }

    public Connection createConnection(ConnectionRequest connectionRequest, User user) {
        User recipient = userRepository.findById(connectionRequest.getRecipientId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipient not found"));
        Connection connection = new Connection(user, recipient);
        connectionRepository.save(connection);
        return connection;
    }

    public void deleteConnection(Long connectionId, User user) {
        Connection connection = connectionRepository.findById(connectionId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Connection not found"));

        if (!connection.getUser1().equals(user) && !connection.getUser2().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to delete this connection");
        }

        connectionRepository.deleteById(connectionId);
    }

    public void acceptConnection(Long connectionId, User user) {
        Connection connection = connectionRepository.findById(connectionId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Connection not found"));

        if (!connection.getUser2().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to accept this connection");
        }

        connection.setActive(true);
        connectionRepository.save(connection);  
    }

    public List<Connection> getConnections(User user) {
        return connectionRepository.findByUser1OrUser2(user, user);
    }
}