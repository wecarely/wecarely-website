import Link from 'next/link';
import type { Article } from '../articles';

export const medicareHomeHealthVsPrivateHomeCare: Article = {
  slug: 'medicare-home-health-vs-private-home-care',
  title: 'Medicare home health vs private home care: what\'s the difference?',
  description:
    "Two services with similar names, completely different rules. A clear breakdown of who pays, who qualifies, what you actually get — and how Houston families decide which one (or both) they need.",
  publishedAt: '2026-05-01',
  updatedAt: '2026-05-01',
  author: {
    name: 'WeCarely Editorial',
    role: 'Independent home care directory',
  },
  topic: 'Insurance & coverage',
  heroImage: {
    src: '/blog/medicare-home-health-vs-private-home-care/hero-home-visit.jpg',
    alt: 'A nurse using a stethoscope to check a patient at home',
    credit: 'Photo by Pavel Danilyuk on Pexels',
  },
  body: () => (
    <>
      <p>
        The most common confusion families run into when they first start
        looking for help at home is treating <em>Medicare home health</em>{' '}
        and <em>private home care</em> as the same thing. They aren&apos;t.
        Mixing them up wastes weeks — sometimes thousands of dollars —
        before the right service shows up at the door.
      </p>

      <p>Here&apos;s the difference, in the order it usually matters.</p>

      <h2>The fundamental split: medical vs non-medical</h2>

      <p>
        The line between these two services isn&apos;t blurry. It runs
        through a single question: <strong>does someone need a clinician
        (nurse, therapist) coming to the house, or do they need a person to
        help with daily life?</strong>
      </p>

      <ul>
        <li>
          <strong>Medical → home health.</strong> Skilled nursing, wound
          care, IV antibiotics, post-stroke physical therapy, post-surgery
          occupational therapy. Ordered by a physician.
        </li>
        <li>
          <strong>Non-medical → home care.</strong> Bathing, dressing,
          meals, light housekeeping, supervision. No medical orders
          involved.
        </li>
      </ul>

      <p>
        A single agency may offer both, but they bill separately and the
        eligibility rules don&apos;t overlap.
      </p>

      <h2>Medicare home health (clinical, intermittent, time-limited in spirit)</h2>

      <p>
        <strong>Who pays.</strong> Original Medicare Part A or B, in full,
        when criteria are met. There&apos;s no copay for the home health
        benefit itself.
      </p>

      <p>
        <strong>Who qualifies.</strong> Three things must be true:
      </p>

      <ol>
        <li>
          A physician has ordered home health and signed off on a
          face-to-face encounter (in person or telehealth, in the 90 days
          before or 30 days after services start).
        </li>
        <li>
          You&apos;re considered &quot;homebound&quot; — leaving home
          requires considerable effort and isn&apos;t medically advised
          except for short trips.
        </li>
        <li>
          The care needed is &quot;skilled&quot; — meaning it requires a
          licensed nurse or therapist, not just an aide.
        </li>
      </ol>

      <p>
        <strong>What you get.</strong> Visits, not hours. A typical schedule
        might be 3 visits a week for nursing, 2 for PT, dropping as recovery
        progresses. Visits run 30–90 minutes. Aides may also visit briefly
        to help with bathing — but only as a side service to the skilled
        care, not as a primary purpose.
      </p>

      <p>
        <strong>How long.</strong> As long as you continue to meet the
        criteria. Care is reviewed every 60 days (a &quot;certification
        period&quot;). Many people are on home health for 4–8 weeks
        post-discharge; some are on it for months for chronic management.
      </p>

      <p className="callout">
        <strong>The trap.</strong> When Medicare home health ends, families
        often expect the same caregiver to keep coming. The agency cannot
        send anyone for free once the skilled need ends — but they often
        offer to continue privately at $25–$32/hour. This is the moment
        families realize they actually need a <em>separate</em> private
        home care service.
      </p>

      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/medicare-home-health-vs-private-home-care/caregiver-kitchen.jpg"
          alt="A caregiver helping someone prepare food in a home kitchen"
          loading="lazy"
        />
        <figcaption>Photo by Gustavo Fring on Pexels</figcaption>
      </figure>

      <h2>Private home care (non-medical, hourly, indefinite)</h2>

      <p>
        <strong>Who pays.</strong>
      </p>

      <ul>
        <li>
          <strong>Out of pocket</strong> is the default in Texas: ~$25–$32
          /hour in Houston in 2026, with most agencies requiring a 4-hour
          minimum shift.
        </li>
        <li>
          <strong>Long-term care insurance</strong>, if the policy is in
          force. Read the elimination period (often 90 days) and daily
          benefit cap before assuming you&apos;re covered.
        </li>
        <li>
          <strong>Texas Medicaid (STAR+PLUS waiver)</strong> for qualifying
          members, after enrollment — wait time in Harris County typically
          runs from a few weeks to several months.
        </li>
        <li>
          <strong>VA Aid and Attendance</strong> for qualifying wartime
          veterans and surviving spouses.
        </li>
        <li>
          Medicare does <strong>not</strong> cover this on its own.
        </li>
      </ul>

      <p>
        <strong>Who qualifies.</strong> Anyone, at any time. No physician
        order, no homebound requirement, no skilled-need test.
      </p>

      <p>
        <strong>What you get.</strong> Hours, not visits. A caregiver
        arrives, stays for the booked shift (4 / 6 / 8 / 12 / 24 hours),
        and helps with whatever falls inside their training: bathing,
        dressing, meal prep, light housekeeping, errands, medication
        reminders (not administration), companionship, and supervision for
        safety and dementia.
      </p>

      <p>
        <strong>How long.</strong> Indefinitely. Some families use it for a
        few weeks to bridge a recovery; others keep a caregiver for years.
      </p>

      <p className="callout">
        <strong>The trap.</strong> Quality varies enormously. Caregiver
        turnover at low-end agencies can be weekly. The cheapest agency on
        Google is rarely the right one — what you&apos;re really paying for
        is reliable scheduling, supervision, and a backup plan when the
        assigned caregiver calls out.
      </p>

      <h2>Side by side</h2>

      <div className="comparison-table-wrap">
        <table className="comparison-table">
          <thead>
            <tr>
              <th></th>
              <th>Medicare home health</th>
              <th>Private home care</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Type of service</th>
              <td>Medical (nurse, therapist)</td>
              <td>Non-medical (aide, companion)</td>
            </tr>
            <tr>
              <th>Who pays</th>
              <td>Medicare</td>
              <td>You / LTC insurance / Medicaid waiver / VA</td>
            </tr>
            <tr>
              <th>Order required</th>
              <td>Physician</td>
              <td>None</td>
            </tr>
            <tr>
              <th>Homebound required</th>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr>
              <th>Billing</th>
              <td>Per visit</td>
              <td>Per hour</td>
            </tr>
            <tr>
              <th>Visit length</th>
              <td>30–90 min</td>
              <td>4–24 hours</td>
            </tr>
            <tr>
              <th>Time limit</th>
              <td>While criteria met</td>
              <td>Indefinite</td>
            </tr>
            <tr>
              <th>Houston rate (2026)</th>
              <td>$0 to family</td>
              <td>$25–$32/hr</td>
            </tr>
            <tr>
              <th>Best for</th>
              <td>Recovery, wound care, post-stroke</td>
              <td>Daily living, supervision, dementia</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Common scenarios</h2>

      <p>
        <strong>&quot;Mom is being discharged tomorrow with a wound vac and
        needs PT.&quot;</strong>
        <br />
        Medicare home health. The hospital&apos;s discharge planner will
        usually arrange it directly with an in-network agency.
      </p>

      <p>
        <strong>&quot;Dad can&apos;t shower safely anymore but is otherwise
        stable.&quot;</strong>
        <br />
        Private home care. Two visits a week, an hour each, for personal
        care. No Medicare path here.
      </p>

      <p>
        <strong>&quot;Mom has dementia and shouldn&apos;t be alone.&quot;</strong>
        <br />
        Private home care, often 8–12 hour shifts. If she also needs
        medication management or has another chronic condition, a hybrid
        arrangement may apply — Medicare home health for the medical piece,
        private care for supervision.
      </p>

      <p>
        <strong>&quot;Dad has a six-month prognosis and we want him at
        home.&quot;</strong>
        <br />
        Hospice — a third category, also Medicare-covered, comfort-focused.
        Most major Houston home health agencies have a hospice arm.
      </p>

      <p>
        <strong>&quot;Mom finished her Medicare home health and wants the
        same caregiver to keep coming.&quot;</strong>
        <br />
        This is the most common transition point. Ask the same agency about
        their private duty service — same building, often the same
        caregiver pool, but now billed at $25–$32/hour out of pocket.
      </p>

      <h2>The order to think about it</h2>

      <p>
        In practice, families tend to figure this out in roughly this
        sequence:
      </p>

      <ol>
        <li>
          <strong>What&apos;s the immediate need?</strong> A clinical task
          (post-discharge, wound, therapy) → home health. A daily-living
          task (bathing, meals, supervision) → home care.
        </li>
        <li>
          <strong>What&apos;s the funding source?</strong> If it&apos;s
          covered by Medicare, the path is short (physician order → agency
          intake). If it&apos;s private pay, you have time to compare
          agencies on rate and reliability.
        </li>
        <li>
          <strong>What&apos;s the timeline?</strong> Discharge tomorrow →
          call the planner now. Stable situation → spend 2–3 days picking
          carefully. Our{' '}
          <Link href="/blog/how-to-choose-a-home-care-agency-in-houston">
            decision guide
          </Link>{' '}
          walks through that path.
        </li>
        <li>
          <strong>Will both be needed?</strong> Often yes — especially for
          post-stroke, post-fall, or dementia situations. Lining them up
          early avoids gaps.
        </li>
      </ol>

      <h2>Houston-specific notes</h2>

      <ul>
        <li>
          <strong>Same agency, different products.</strong> Many of the top
          Houston agencies offer both Medicare home health and private duty.
          Asking up front &quot;do you do both?&quot; is reasonable and
          useful — continuity matters when transitioning between the two.
        </li>
        <li>
          <strong>Private duty pricing.</strong> $25–$32/hour for personal
          care is the 2026 Houston market, slightly lower than Dallas or
          Austin. 4-hour minimum shift is near-universal.
        </li>
        <li>
          <strong>STAR+PLUS waiver waitlist.</strong> Harris County&apos;s
          enrollment volume is high; expect the waitlist for personal
          attendant services to be measured in months rather than weeks.
          Apply as soon as need is established, even if you&apos;re paying
          privately in the meantime.
        </li>
        <li>
          <strong>Language clusters.</strong> Vietnamese, Spanish, and
          Chinese-speaking caregiver pools are concentrated in Sharpstown,
          Alief, and southwest Houston. Both Medicare home health and
          private agencies that serve those neighborhoods well typically
          have multilingual intake staff, not just multilingual caregivers.
        </li>
      </ul>

      <h2>Where to start</h2>

      <p>
        WeCarely lists every Medicare-certified home health agency{' '}
        <em>and</em> every state-licensed private home care agency in
        Houston, ranked by CMS clinical stars combined with Google review
        weight. The same agency&apos;s two products (when they have both)
        are noted on its detail page. We don&apos;t sell leads, we
        don&apos;t take referral fees.
      </p>

      <p>
        Start with the <Link href="/houston">Houston directory</Link>, or
        jump to a neighborhood:{' '}
        <Link href="/houston/area/sharpstown">Sharpstown</Link>,{' '}
        <Link href="/houston/area/galleria">Galleria</Link>,{' '}
        <Link href="/houston/area/cypress">Cypress</Link>,{' '}
        <Link href="/houston/area/memorial-energy-corridor">
          Memorial / Energy Corridor
        </Link>
        .
      </p>

      <p>
        If you&apos;re earlier in the decision and still figuring out what
        to look for,{' '}
        <Link href="/blog/how-to-choose-a-home-care-agency-in-houston">
          our guide on how to choose a home care agency in Houston
        </Link>{' '}
        is the next read.
      </p>

      <p className="callout">
        <strong>Sources.</strong> Medicare home health benefit (
        medicare.gov/coverage/home-health-services), CMS face-to-face
        encounter rule (cms.gov), Texas STAR+PLUS waiver (hhs.texas.gov),
        VA Aid &amp; Attendance (va.gov/pension). Rates reflect 2026
        Houston market data; confirm current pricing with each agency.
      </p>
    </>
  ),
};
