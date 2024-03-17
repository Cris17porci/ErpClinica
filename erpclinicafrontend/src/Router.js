import { Route, Router, Switch } from 'wouter';
import FormularioCitas from './componentes/FormularioCitas/FormularioCitas';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/formulario-citas" component={FormularioCitas} />
        {/* Otras rutas */}
      </Switch>
    </Router>
  );
};

export default App;