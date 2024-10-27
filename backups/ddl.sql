-- tienda_virtual.productos definition

CREATE TABLE `productos` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` varchar(400) DEFAULT '"sin descripcion"',
  `precio` decimal(10,0) NOT NULL,
  `cantidad_disponible` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- tienda_virtual.cliente definition

CREATE TABLE `cliente` (
  `dni` varchar(50) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `clave` varchar(300) NOT NULL,
  `correo` varchar(150) NOT NULL,
  PRIMARY KEY (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- tienda_virtual.categorias definition

CREATE TABLE `categorias` (
  `id` int NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- tienda_virtual.pedidos definition

CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `descuento` smallint DEFAULT '0',
  `medio_pago` varchar(100) NOT NULL,
  `cliente_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pedidos_cliente_FK` (`cliente_id`),
  CONSTRAINT `pedidos_cliente_FK` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- tienda_virtual.dirreccion definition

CREATE TABLE `dirreccion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomenclatura` varchar(200) NOT NULL,
  `notas` varchar(300) NOT NULL,
  `cliente_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Dirreccion_cliente_FK` (`cliente_id`),
  CONSTRAINT `Dirreccion_cliente_FK` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- tienda_virtual.categoriaproducto definition

CREATE TABLE `categoriaproducto` (
  `producto_id` int NOT NULL,
  `categoria_id` int NOT NULL,
  PRIMARY KEY (`producto_id`,`categoria_id`),
  KEY `categoriaProducto_categorias_FK` (`categoria_id`),
  CONSTRAINT `categoriaProducto_categorias_FK` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`),
  CONSTRAINT `categoriaProducto_productos_FK` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- tienda_virtual.items definition

CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `producto_id` int NOT NULL,
  `pedido_id` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `items_productos_FK` (`producto_id`),
  KEY `items_pedidos_FK` (`pedido_id`),
  CONSTRAINT `items_pedidos_FK` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  CONSTRAINT `items_productos_FK` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;