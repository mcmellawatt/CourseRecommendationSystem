/* javascript for history tab view */

(function () {

    // shorthand reference to core module
    function core() {
        return cs6310app.core;
    }

    // render the history view with the given response data
    function render(resp) {
        console.log('render history view with', resp);

        var p = resp.payload,
            s = p.student,
            solns = p.solutions,
            nsol = solns.length,
            ss = nsol === 1 ? '' : 's',
            view = core().view('history');

        view.append('<h2> History View </h2>');

        if (!nsol) {
            view.append('<p>(No Recommendations)</p>');
        } else {
            var html = [];
            html.push('<table class="history-info">');
            solns.forEach(function (sol, index) {
                genSolutionRow(html, sol, index===0);
            });
            view.append(html.join(''));
        }
    }

    function genSolutionRow(html, sol, first) {
        var d = sol.derived,
            ts = sol.timestamp,
            clsDerived = d ? ' derived' : '',
            time = d ? ts + ' (derived)' : ts,
            clsCurrent = first ? ' current' : '';

        function mkRow(cls, value) {
            html.push('<tr class="');
            html.push(cls + clsDerived + clsCurrent);
            html.push('"><td>');
            html.push(value);
            html.push('</td></tr>');
        }

        mkRow('ts', time);
        mkRow('npref', '# Courses Preferred: <b>' + sol.numCoursesPreferred + '</b>');
        mkRow('npref', 'Recommended Courses:');
        sol.recommended.forEach(function (rec) {
            mkRow('course', core().htmlCourse(rec));
        });
    }

    // called when our view is unloaded
    function unload() {
        // nothing to do here
    }


    // register our history functionality
    cs6310app.history = {
        render: render,
        unload: unload
    };
}());
