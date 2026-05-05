import Link from 'next/link';
import type { Article } from '../articles';

export const whatIsCmsStarRating: Article = {
  slug: 'what-is-cms-star-rating-home-care',
  title: 'What Is a CMS Star Rating? How to Read a Home Care Quality Score',
  description:
    "CMS star ratings are the only independent, government-published quality scores for home care agencies. Here is what they actually measure, what they miss, and how to use them alongside Google reviews.",
  publishedAt: '2026-05-05',
  updatedAt: '2026-05-05',
  author: {
    name: 'WeCarely Editorial',
    role: 'Independent home care directory',
  },
  topic: 'How it works',
  body: () => (
    <>
      <p>
        When you search for a home care agency, you will encounter star ratings
        from multiple sources — Google, Yelp, the agency&apos;s own website.
        Among these, one stands apart: the CMS (Centers for Medicare &amp;
        Medicaid Services) quality star rating. It is the only rating that comes
        from the federal government, based on standardized clinical data, and
        applies to every Medicare-certified home health agency in the country.
      </p>

      <p>
        WeCarely displays CMS star ratings prominently for every agency in our
        directory. This guide explains exactly what those ratings measure, what
        they do not capture, and how to use them alongside Google reviews to make
        a better decision.
      </p>

      <h2>What CMS is and why its ratings matter</h2>

      <p>
        The Centers for Medicare &amp; Medicaid Services is the federal agency
        that administers Medicare and Medicaid. Every Medicare-certified home
        health agency in the United States is required to submit patient outcome
        data to CMS through a standardized assessment tool called OASIS (Outcome
        and Assessment Information Set). This data is collected at the start,
        during, and end of each patient episode.
      </p>

      <p>
        From this data, CMS calculates quality metrics and publishes them in a
        tool called Care Compare (formerly Home Health Compare). The star ratings
        on Care Compare are the public-facing summary of that data.
      </p>

      <p>
        Because this data is collected uniformly across every agency using the
        same tool, CMS ratings allow genuine apples-to-apples comparison across
        agencies — something Google reviews cannot provide. A 4.8-star Google
        rating from 12 reviews tells you very little about clinical outcomes.
        A 4-star CMS quality rating tells you something specific and verifiable.
      </p>

      <h2>How CMS star ratings are calculated</h2>

      <p>
        CMS publishes two types of star ratings for home health agencies:
      </p>

      <h3>Quality of Patient Care Star Rating</h3>
      <p>
        This is the rating WeCarely displays. It is calculated from seven
        clinical quality measures that reflect actual patient outcomes:
      </p>

      <table>
        <thead>
          <tr>
            <th>Measure</th>
            <th>What it tracks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Timely initiation of care</td>
            <td>% of patients who began care within 2 days of referral</td>
          </tr>
          <tr>
            <td>Improvement in ambulation</td>
            <td>% of patients who got better at walking or moving around</td>
          </tr>
          <tr>
            <td>Improvement in bed transferring</td>
            <td>% who improved at getting in and out of bed</td>
          </tr>
          <tr>
            <td>Improvement in bathing</td>
            <td>% who improved at bathing independently</td>
          </tr>
          <tr>
            <td>Improvement in pain when walking</td>
            <td>% who experienced less pain while moving</td>
          </tr>
          <tr>
            <td>Improvement in shortness of breath</td>
            <td>% with less breathing difficulty during activity</td>
          </tr>
          <tr>
            <td>Acute care hospitalization</td>
            <td>% who were NOT hospitalized during the care episode</td>
          </tr>
        </tbody>
      </table>

      <p>
        Each measure is risk-adjusted — meaning the calculation accounts for the
        severity of the patient population. An agency that serves sicker patients
        is not penalized simply because its patients have worse starting
        conditions. This adjustment makes the comparison fairer.
      </p>

      <p>
        After calculating each measure, CMS assigns 1 to 5 stars based on where
        the agency falls relative to all agencies nationally. An agency at the
        50th percentile nationally earns 3 stars. Agencies in the top ~20%
        earn 5 stars.
      </p>

      <h3>Patient Survey Star Rating (HHCAHPS)</h3>
      <p>
        A second rating comes from the Home Health Consumer Assessment of
        Healthcare Providers and Systems (HHCAHPS) survey — a standardized
        patient experience survey administered to a random sample of the
        agency&apos;s patients. It covers:
      </p>
      <ul>
        <li>Whether staff communicated well</li>
        <li>Whether the team discussed medications, pain, and home safety</li>
        <li>Whether the patient would recommend the agency to family or friends</li>
      </ul>
      <p>
        HHCAHPS ratings reflect the patient experience; Quality of Patient Care
        ratings reflect clinical outcomes. Both matter, but they capture different
        dimensions of quality.
      </p>

      <h2>What CMS star ratings do not capture</h2>

      <p>
        CMS ratings are valuable, but they have real limitations that every
        family should understand before relying on them exclusively.
      </p>

      <h3>They do not measure staff consistency</h3>
      <p>
        The OASIS data does not capture how many different aides were in a
        patient&apos;s home, or whether care was provided by the same person
        consistently. For dementia patients and seniors with anxiety, staff
        consistency is one of the most important quality factors — and CMS
        ratings say nothing about it.
      </p>

      <h3>They lag by 12–18 months</h3>
      <p>
        CMS collects and processes data on a rolling basis, but ratings are
        updated quarterly and reflect care delivered over the prior 12–18 months.
        An agency that underwent significant management changes, had a key
        clinical director leave, or expanded rapidly may have ratings that do not
        reflect its current state.
      </p>

      <h3>They are averages</h3>
      <p>
        A 4-star agency might be excellent for post-surgical rehabilitation and
        mediocre for dementia care. The aggregate rating does not distinguish
        between service lines. If you are seeking care for a specific condition,
        ask the agency directly about their experience with that condition — do
        not rely on the overall star rating alone.
      </p>

      <h3>Small agencies can have unreliable ratings</h3>
      <p>
        CMS requires a minimum number of patients to calculate a rating. Agencies
        with very small patient volumes may have ratings based on 25–50 patients
        rather than 500. A few outlier cases can move the rating significantly.
        For small agencies, look at the sample size underlying the rating, not
        just the rating itself.
      </p>

      <h3>They do not cover non-Medicare patients</h3>
      <p>
        OASIS data is collected only for Medicare patients. If an agency serves
        primarily private-pay or Medicaid patients, its CMS rating may be based
        on a small, unrepresentative subset of its actual patient population.
      </p>

      <h2>How to use CMS ratings alongside Google reviews</h2>

      <p>
        CMS star ratings and Google reviews are complementary, not competing,
        signals. They measure different things:
      </p>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>CMS Quality Stars</th>
            <th>Google Reviews</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>What it measures</td>
            <td>Clinical outcomes (standardized)</td>
            <td>Patient / family experience (self-reported)</td>
          </tr>
          <tr>
            <td>Who generates it</td>
            <td>Federal government</td>
            <td>Patients, families, and sometimes employees</td>
          </tr>
          <tr>
            <td>Manipulation risk</td>
            <td>Low (government data)</td>
            <td>Moderate (reviews can be gamed)</td>
          </tr>
          <tr>
            <td>Recency</td>
            <td>12–18 month lag</td>
            <td>Real-time</td>
          </tr>
          <tr>
            <td>Coverage</td>
            <td>All Medicare-certified agencies</td>
            <td>Only agencies with Google Business profiles</td>
          </tr>
        </tbody>
      </table>

      <p>
        The patterns to watch for:
      </p>

      <ul>
        <li>
          <strong>High CMS + high Google</strong> is the strongest signal. The
          agency performs well on standardized clinical measures AND patients
          report good experiences. This is the combination WeCarely&apos;s trust
          score is designed to surface.
        </li>
        <li>
          <strong>High CMS + low Google</strong> often indicates an agency with
          good clinical outcomes but poor communication, billing issues, or
          inconsistent staffing. Clinical quality without patient satisfaction
          is a real pattern.
        </li>
        <li>
          <strong>Low CMS + high Google</strong> is a warning sign. An agency
          can be friendly and responsive while still having worse-than-average
          clinical outcomes. &ldquo;Everyone was so kind&rdquo; reviews are
          meaningful — but they do not tell you whether the patient recovered
          well or was rehospitalized.
        </li>
        <li>
          <strong>Low CMS + low Google</strong> is a clear avoid.
        </li>
        <li>
          <strong>No Google reviews</strong> can mean the agency is new,
          small, or serves a community that does not leave online reviews.
          It is not automatically a negative signal — especially in communities
          where oral referral networks are the primary means of agency selection.
        </li>
      </ul>

      <h2>Where WeCarely&apos;s trust score comes from</h2>

      <p>
        WeCarely does not invent its own quality score. The trust score you see
        on every listing is derived from two public data sources:
      </p>

      <ol>
        <li>
          <strong>CMS Quality of Patient Care star rating</strong>, published
          quarterly by the federal government based on standardized OASIS
          assessment data across all Medicare-certified agencies.
        </li>
        <li>
          <strong>Google Business rating and review count</strong>, sourced
          directly from Google Places and not curated or filtered by us.
        </li>
      </ol>

      <p>
        We do not accept payment to influence rankings. We do not allow agencies
        to submit their own ratings or testimonials. The order of agencies on
        every city page reflects the trust score formula — nothing else.
      </p>

      <h2>Start browsing in your city</h2>

      <ul>
        <li><Link href="/houston">Home care agencies in Houston, TX</Link></li>
        <li><Link href="/chicago">Home care agencies in Chicago, IL</Link></li>
        <li><Link href="/miami">Home care agencies in Miami, FL</Link></li>
        <li><Link href="/los-angeles">Home care agencies in Los Angeles, CA</Link></li>
        <li><Link href="/dallas">Home care agencies in Dallas, TX</Link></li>
        <li><Link href="/orlando">Home care agencies in Orlando, FL</Link></li>
        <li><Link href="/skokie">Home care agencies in Skokie, IL</Link></li>
        <li><Link href="/san-diego">Home care agencies in San Diego, CA</Link></li>
      </ul>
    </>
  ),
};
