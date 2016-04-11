/**
 * Created by c on 16/3/21.
 */
import { connect } from 'react-redux'
import Awesomplete from 'ucjs_modules/awesomplete/1.1.0/awesomplete.js'
import 'ucjs_modules/awesomplete/1.1.0/awesomplete.css'

//docs
//http://leaverou.github.io/awesomplete/

class AutoCompletePage extends React.Component {
    componentDidMount(prevProps, prevState) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "https://restcountries.eu/rest/v1/lang/fr", true);
        ajax.onload = function() {
            var list = JSON.parse(ajax.responseText).map(function(i) {
                return i.name;
            });
            new Awesomplete(document.querySelector("#ajax-example input"), { list: list });
        };
        ajax.send();

        new Awesomplete('input[data-multiple]', {
            filter: function(text, input) {
                return Awesomplete.FILTER_CONTAINS(text, input.match(/[^,]*$/)[0]);
            },

            replace: function(text) {
                var before = this.input.value.match(/^.+,\s*|/)[0];
                this.input.value = before + text + ", ";
            }
        });
    }

    render() {
        return (
            <div>
                <div>
                    <input className="awesomplete"
                           data-list="Ada, Java, JavaScript, Brainfuck, LOLCODE, Node.js, Ruby on Rails"/>

                </div>
                <div>
                    <input className="awesomplete" list="mylist"/>
                    <datalist id="mylist">
                        <option>Ada</option>
                        <option>Java</option>
                        <option>JavaScript</option>
                        <option>Brainfuck</option>
                        <option>LOLCODE</option>
                        <option>Node.js</option>
                        <option>Ruby on Rails</option>
                    </datalist>
                </div>
                <div id="ajax-example">
                    <input type="text"/>
                </div>
                <div>
                    Multiple values
                    <input data-list="CSS, JavaScript, HTML, SVG, ARIA, MathML" data-multiple/>
                </div>
            </div>
        )
    }
}

export default connect()(AutoCompletePage)