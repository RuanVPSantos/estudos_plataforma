
import AmbienteRouter from "./ambiente/router";
import CategoriaRouter from "./categoria/router";
import SubCategoriaRouter from "./subcategoria/router";
import ConteudoRouter from "./conteudo/router";
import UsuarioRouter from "./usuario/router";


const routes = [
    { router: AmbienteRouter, prefix: "/ambiente" },
    { router: CategoriaRouter, prefix: "/categoria" },
    { router: SubCategoriaRouter, prefix: "/subcategoria" },
    { router: ConteudoRouter, prefix: "/conteudo" },
    { router: UsuarioRouter, prefix: "/usuario" },
];

export default routes;
